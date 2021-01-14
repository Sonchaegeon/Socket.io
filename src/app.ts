import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
import { HttpError } from "./types/HttpError";

// Database connect
import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (err: HttpError) => {
    console.log("Mongoose Connection ERROR: " + err.message);
})

mongoose.connection.once('open', () => {
    console.log("DB Connected");
})

// Model
import "./models/User";
import "./models/Chatroom";
import "./models/Message";

// Routes
import userRouter from "./routers/user";
import chatroomRouter from "./routers/chatroom";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/chatroom', chatroomRouter);

// Error Handle
app.use((req: Request, res: Response, next: NextFunction) => {
    const err: Error = new HttpError(404, `${req.method}, ${req.url} 라우터가 없습니다.`);
    next(err);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
        message: err.message,
        error: process.env.ENV !== 'PRODUCTION' ? err : {},
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})