import { User } from "../model/User.model.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { deleteFromCloudinary, uploadCloudinary } from "../utility/Cloudnary.js"
import { ApiResponse } from "../utility/ApiResponse.js"
import jwt from "jsonwebtoken";
import { Collection } from "../model/Collection.model.js";
import mongoose from "mongoose";
import { upload } from "../middleware/multer.middleware.js";

const generateAccessTokenandrefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password -avtar");
        const accsesstoken = user.generateAccessToken();
        const refreshtoken = user.generateRefreshToken();
        user.refreshToken = refreshtoken;
        await user.save({ validateBeforeSave: false })
        return { accsesstoken, refreshtoken };
    } catch (error) {
        throw new ApiError(500, error);
    }

}


const register = asyncHandler(async (req, res) => {
    //take inpute
    //validate it
    //upload avtar on cloudnary
    //create user

    const { name, email, password } = req.body;
    //basic validation
    if (!name || !email || !password) {
        throw new ApiError(101, "all fields are required");
    }
    const isexist = await User.findOne({ email: email })

    if (isexist) throw new ApiError(102, "user already exist")


    let avtarLocalPath;
    if (req.files && Array.isArray(req.files.avtar) && req.files.avtar.length > 0) {
        avtarLocalPath = req.files.avtar[0].path;
    }

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const cloudinaryresponse = await uploadCloudinary(avtarLocalPath);

    if (!cloudinaryresponse) {
        throw new ApiError(500, "File upload to cloud failed")
    }
    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            url: cloudinaryresponse.url,
            public_id: cloudinaryresponse.public_id
        }
    });

    console.log(cloudinaryresponse.public_id);

    res.status(200).json(
        new ApiResponse(200, user, "user registered successfully")
    )

})


const login = asyncHandler(async (req, res) => {
    // take user inpute
    // check userexist or not if exist check password
    // generate accsess token and refresh token
    //update it 
    //send response

    const { email, password } = req.body;
    const isexist = await User.findOne({ email: email });
    if (!isexist) {
        throw new ApiError(401, "user not found check email");

    }
    const iscorrectpass = isexist.isPasswordCorrect(password, isexist.password);
    if (!iscorrectpass) {
        throw new ApiError(400, "password is wrong");
    }

    const { accsesstoken, refreshtoken } = await generateAccessTokenandrefreshToken(isexist._id);

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
    res.status(200)
        .cookie("accsessToken", accsesstoken, option)
        .cookie("refreshToken", refreshtoken, option)
        .json(
            new ApiResponse(201, { accsesstoken, refreshtoken }, "login successfully")
        )

})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        }
    )

    res.status(200)
        .clearCookie("accsessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(200, {}, "logout succsessfully!")
        )

})


const refreshAccsessToken = asyncHandler(async (req, res) => {
    const incomingtoken = req.cookies?.refreshToken || req.headers?.authorization?.split(" ")[1];
    if (!incomingtoken) {
        throw new ApiError(105, " token are not found");
    }
    const token = jwt.verify(incomingtoken, process.env.REFRESS_TOKEN_SECRET)
    if (!token) {
        throw new ApiError(105, "invalid token");
    }
    const { accsesstoken, refreshtoken } = generateAccessTokenandrefreshToken(token._id);
    await User.findByIdAndUpdate(
        token._id,
        {
            $set: {
                refreshToken: refreshtoken,
            }
        }
    )

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    res.status(200)
        .cookie("accsessToken", accsesstoken, option)
        .cookie("refreshToken", refreshtoken, option)
        .json(
            new ApiResponse(201, { accsesstoken, refreshtoken }, "genarate accsstoken and refreshtoken succssfully!")
        )


})

const fetchuser = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        // 1. Match current user
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }
        },

        // 2. Lookup collections
        {
            $lookup: {
                from: "collections",           // ⚠️ must be collection name in DB (lowercase, plural)
                localField: "collection",      // array in User
                foreignField: "_id",
                as: "collections"
            }
        },

        // 3. Lookup todos from all collections
        {
            $lookup: {
                from: "todos",                 // ⚠️ lowercase plural
                localField: "collections.todos",
                foreignField: "_id",
                as: "allTodos"
            }
        },

        // 4. Merge todos into each collection
        {
            $addFields: {
                collections: {
                    $map: {
                        input: "$collections",     // ⚠️ not "$collection"
                        as: "cols",
                        in: {
                            _id: "$$cols._id",
                            title: "$$cols.collection",
                            todos: {
                                $filter: {
                                    input: "$allTodos",
                                    as: "todo",
                                    cond: { $in: ["$$todo._id", "$$cols.todos"] }
                                }
                            }
                        }
                    }
                }
            }
        },

        // 5. Remove temp field
        {
            $project: {
                allTodos: 0,
                password: 0,
                refreshToken: 0
            }
        }
    ]);

    res.status(200)
        .json(
            new ApiResponse(200, user, "user data fetched succssessfully!")
        )


});

const updateAvtar = asyncHandler(async (req, res) => {
    // take user id
    //upload file on cloudnary
    // dlete previous pic 
    // change avtar 
    //save it
    const user = await User.findById(req.user._id);

    let avtarLocalPath;
    if (req.files && Array.isArray(req.files.avtar) && req.files.avtar.length > 0) {
        avtarLocalPath = req.files.avtar[0].path;
    }

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    await deleteFromCloudinary(user.avtar.public_id);
    const uploadpic = await uploadCloudinary(avtarLocalPath)

    if (!uploadpic) {
        throw new ApiError(500, "File upload to cloud failed")
    }

    user.avtar.url = uploadpic.url;
    user.avtar.public_id = uploadpic.public_id;
    await user.save();

    res.status(200).json(
        new ApiResponse(201, { uploadpic }, "update profile succssfully!")
    )


})


export { register, login, logout, refreshAccsessToken, fetchuser, updateAvtar };