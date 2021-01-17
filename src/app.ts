import express, { Express, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
import { HttpError, Payload } from "./types/HttpError";

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
const Message = mongoose.model("Message");
const User = mongoose.model("User");

// Routes
import userRouter from "./routers/user";
import chatroomRouter from "./routers/chatroom";
import { Socket } from 'socket.io';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
})

const io: Socket = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.use( async (socket: Socket | any, next: NextFunction | any) => {
    try{
        const token = socket.handshake.query.token;
        jwt.verify(token, process.env.JWT_SECRET, (err: Error, payload: Payload) => {
            socket.userId = payload.id;
            next();
        });
    } catch(err) {}
})

io.on('connection', (socket: Socket) => {
    console.log('connected: ' + socket.userId);

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.userId);
    })

    socket.on("joinRoom", ({chatroomId}: {chatroomId: string}) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom: " + chatroomId);
    })

    socket.on("leaveRoom", ({chatroomId}: {chatroomId: string}) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId);
    })

    socket.on("chatroomMessage", async ({chatroomId, message}: {chatroomId: string, message: string}) => {
        if(message.trim().length > 0){
            const user = await User.findOne({_id: socket.userId});
            const newMessage = new Message({chatroom: chatroomId, user: socket.userId, message})
            io.to(chatroomId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
            });

            await newMessage.save();
        }
    })
})
