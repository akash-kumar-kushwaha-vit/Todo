import mongoose, { Collection } from "mongoose";

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
    },
    avtar: {
        type: String,
    },
    todo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }],
    collection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }]


})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await hash(this.password, 10)

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