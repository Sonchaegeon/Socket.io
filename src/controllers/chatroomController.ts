import { Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../types/HttpError";

const Chatroom = mongoose.model("Chatroom");

export const createChatroom = async (req: Request, res: Response) => {
    const { name } = req.body;

    const nameRegex = /^["A-Za-z\s"]+$/;
    if(!nameRegex.test(name)) throw new HttpError(400, "Chatroom name can contain only alphabets");

    const chatroomExists = await Chatroom.findOne({ name });
    if(chatroomExists) throw new HttpError(400, "Chatroom with that name already exists");

    const chatroom = new Chatroom({ name });

    await chatroom.save();

    return res.json({
        message: "Chatroom created!",
    });
}

export const getAllChatroom = async (req: Request, res: Response) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}