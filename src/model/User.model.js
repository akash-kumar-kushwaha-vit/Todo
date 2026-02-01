import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { stringify } from "querystring";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avtar: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true
        }

    },
    collection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }],
    refreshToken: {
        type: String,
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await hash(this.password, 10);

});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        user: this.user,
        fullName: this.fullName,
        password: this.password,
    },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESS_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User", userSchema);