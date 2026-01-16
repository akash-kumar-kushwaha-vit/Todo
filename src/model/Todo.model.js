
import mongoose from "mongoose";

import { boolean } from "webidl-conversions";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    status: {
        type: boolean,
        default: false
    },


}, { timeStamp: true })


export const Todo = mongoose.model("Todo", todoSchema);