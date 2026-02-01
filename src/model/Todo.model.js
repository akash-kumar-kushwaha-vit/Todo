
import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,

        default: false
    },


}, { timestamps: true })


export const Todo = mongoose.model("Todo", todoSchema);