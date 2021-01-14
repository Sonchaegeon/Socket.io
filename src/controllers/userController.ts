import mongoose from "mongoose";
import { sha256 } from "js-sha256";

import { HttpError } from "../types/HttpError";
import { BusinessLogic } from "../types/BusinessLogic";

const User = mongoose.model('User');

export const register: BusinessLogic = async(req, res, next) => {
    const {name, email, password} = req.body;
    const emailRegex: RegExp = /[@gmail.com]/;
    
    if(!emailRegex.test(email)) throw new HttpError(400, "Email is not supported from your domain");
    if(password > 6) throw new HttpError(400, "Password must be atleast 6 characters long");

    const user = new User({ name,
        email,
        password: sha256(password + process.env.SALT) 
    });

    await user.save();

    return res.json({
        message: "User [" + name + "] registered successfully!",
    });
}

export const login: BusinessLogic = async(req, res, next) => {
    
}