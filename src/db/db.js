import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const Dbconnect = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(() => {
                console.log(mongoose.connection.host)
                console.log("mongodb connected successfully")

            })
            .catch((error) => {
                console.log("erro", error)
            })
    } catch (error) {

        console.log(error)
    }
}