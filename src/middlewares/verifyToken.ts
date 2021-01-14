import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { HttpError } from "../types/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.headers.authorization) throw new HttpError(403, "Forbidden!");
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        
        req.payload = payload;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Forbidden"
        })
    }
}