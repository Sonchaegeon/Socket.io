import mongoose from "mongoose";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";

import { HttpError } from "../types/HttpError";
import { BusinessLogic } from "../types/BusinessLogic";

const User = mongoose.model('User');

export const register: BusinessLogic = async(req, res, next) => {
    const {name, email, password} = req.body;
    const emailRegex: RegExp = /@gmail.com/;
    
    if(!emailRegex.test(email)) throw new HttpError(400, "Email is not supported from your domain");
    if(password > 6) throw new HttpError(400, "Password must be atleast 6 characters long");

    const user = new User({ 
        name,
        email,
        password: sha256(password + process.env.SALT as string) 
    });

    await user.save();

    return res.json({
        message: "User [" + name + "] registered successfully!",
    });
}

export const login: BusinessLogic = async(req, res, next) => {
    const {email, password} = req.body;
    const user = await User.find({
        email, 
        password: sha256(password + process.env.SALT as string)
    });

    if(!user) throw new HttpError(400 , "Email and Password did not match");

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string);

    return res.json({
        message: "User logged in successfully!",
        token
    })
}