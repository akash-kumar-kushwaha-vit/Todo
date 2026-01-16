
import { Dbconnect } from "./db/db.js";
import app from "./app.js";
const Port = process.env.PORT || 8000;
import dotenv from "dotenv";

dotenv.config();
Dbconnect().then(() => {
    app.listen(Port, () => {
        console.log(`server is running on port ${Port}`)
    })

}).catch((error) => {
    console.log("failed to connect to db", error)
})

