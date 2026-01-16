import mongoose from "mongoose";


const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true })


export const Collection = mongoose.model("Collection", collectionSchema);