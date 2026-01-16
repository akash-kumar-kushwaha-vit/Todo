import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";




const app = express();

//middleware

app.use(cors(process.env.ORIGIN_URL))
app.use(cookieParser())










export default app;