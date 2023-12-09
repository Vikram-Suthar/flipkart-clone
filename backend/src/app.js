import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
import Router from "./routes/route.js";

app.use(cors({credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);
app.use(express.static("../public"));

export { app };