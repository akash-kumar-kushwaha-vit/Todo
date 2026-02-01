import mongoose from "mongoose";


const collectionSchema = new mongoose.Schema({
    collection: {
        type: String,
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }],

}, {
    timestamps: true,
    suppressReservedKeysWarning: true
})


export const Collection = mongoose.model("Collection", collectionSchema);