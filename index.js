import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(`${PORT}`, () => console.log(`Sever on http://localhost:${PORT}`));
