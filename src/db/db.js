import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "process";


export const Dbconnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(() => {
                console.log(mongoose.connection.host)

            })
            .catch((error) => {
                console.log("erro", error)
            })
    } catch (error) {

        console.log(error)
    }
}