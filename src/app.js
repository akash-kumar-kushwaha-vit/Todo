import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";




const app = express();



//middleware

app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("frontend"))
app.use(cookieParser())


// user
import userrouter from "./route/User.router.js";
app.use("/api/user", userrouter);


// task
// task
import taskrouter from "./route/task.router.js"
app.use("/api", taskrouter)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});






export default app;