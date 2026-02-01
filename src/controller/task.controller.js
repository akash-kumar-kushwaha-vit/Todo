import { User } from "../model/User.model.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { ApiResponse } from "../utility/ApiResponse.js"
import { Todo } from "../model/Todo.model.js";
import { Collection } from "../model/Collection.model.js";
import mongoose from "mongoose";


const collectiontodo = asyncHandler(async (req, res) => {
    // take user input 
    // then push into user todos array
    const { title, discription } = req.body;
    if (!(title || discription)) {
        throw new ApiError(104, "all fields are required");
    }
    const { collection } = req.params;
    const collectionobj = await Collection.findOne({ collection })

    if (!collectionobj) {
        throw new ApiError(401, "collection not found")
    }

    const todo = await Todo.create({
        title,
        discription
    })

    await Collection.findByIdAndUpdate(
        collectionobj._id
        ,
        {
            $push: {
                todos: todo,
            },


        }
    );




    res.status(200)
        .json(
            new ApiResponse(200, { todo }, "Add task successfully")
        )

})


const collection = asyncHandler(async (req, res) => {
    // user input 
    // create collection 
    const { collection } = req.body;
    if (!collection) {
        throw new ApiError(103, "empty collection")
    }

    const createcollection = await Collection.create({
        collection,
    })

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                collection: createcollection
            }
        }
    )

    res.status(200)
        .json(
            new ApiResponse(200, { createcollection }, "collection created succesfully!")
        )

})

const changeStatus = asyncHandler(async (req, res) => {
    // take collection idx and todo idx from frontend
    // find in user collection id
    // in collection find todo id
    // update it


    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(101, "user are not found");
    }
    const { todoid } = req.body;

    const todo = await Todo.findById(todoid);
    if (!todo) {
        throw new ApiError(404, "Todo are not found");
    }

    // ✅ Toggle status
    todo.status = !todo.status;
    await todo.save({ validateBeforeSave: false });

    res.status(200)
        .json(
            new ApiResponse(200, {}, "change status succsessfully!")
        )


})

const deletetodo = asyncHandler(async (req, res) => {
    const { todoid, collectionname } = req.body;

    // 1️⃣ delete todo
    const todo = await Todo.findByIdAndDelete(todoid);
    if (!todo) {
        return res.status(404).json(
            new ApiResponse(404, null, "Todo not found")
        );
    }

    // 2️⃣ find collection
    const collec = await Collection.findOne({ collection: collectionname });
    if (!collec) {
        return res.status(404).json(
            new ApiResponse(404, null, "Collection not found")
        );
    }

    // 3️⃣ remove todo reference (ObjectId safe)
    collec.todos = collec.todos.filter(
        (id) => id.toString() !== todoid
    );

    // 4️⃣ save updated collection
    await collec.save();

    res.status(200).json(
        new ApiResponse(200, null, "Todo deleted successfully!")
    );
});

const deletecollection = asyncHandler(async (req, res) => {
    const { collectionid } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(401, "unotherized requist not found user");
    }

    user.collection = user.collection.filter((id) => id !== collectionid);
    await user.save();
    const collec = await Collection.findById(collectionid);

    if (!collec) {
        throw new ApiError(401, "unotherized requist not found collection");
    }

    await Todo.deleteMany({
        _id: { $in: collec.todos }
    })
    await Collection.findByIdAndDelete(collectionid);

    res.status(200).json(
        new ApiResponse(201, "", "delete collection successfully!")
    )
})

const updateTask = asyncHandler(async (req, res) => {
    //todo id input
    //change title discription 
    // save it
    const { todoid, title, discription } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
        todoid,
        {
            $set: {
                title,
                discription
            }
        }, {
        new: true,        // return updated document
        runValidators: true
    }

    )
    if (!updatedTodo) {
        throw new ApiError(401, "todo not found!");
    }

    res.status(200).json(
        new ApiResponse(201, updatedTodo, "task is updated succssesfully!")
    )


})

export { collectiontodo, collection, changeStatus, deletetodo, deletecollection, updateTask };