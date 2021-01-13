import { NextFunction, Request, Response } from "express";

export const catchErrors = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: Error) => {
            // Validation Errors
            if(typeof err === "string") {
                res.status(400).json({
                    message: err,
                });
            } else {
                next(err);
            }
        })
    }
}

export const mongoseErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key) => message += err.errors[key].message + ", ");

    message = message.substr(0, message.length - 2);

    res.status(400).json({
        message,
    });
}

export const developmentErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    res.status(err.status || 500).json(errorDetails);
}

export const productionErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    });
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found",
    });
}