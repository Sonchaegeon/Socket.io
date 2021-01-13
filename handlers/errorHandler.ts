import { NextFunction, Request, Response } from "express";

exports.catchErrors = (fn) => {
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

exports.mongoseErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key) => message += err.errors[key].message + ", ");

    message = message.substr(0, message.length - 2);

    res.status(400).json({
        message,
    });
}

exports.developmentErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    res.status(err.status || 500).json(errorDetails);
}

exports.productionErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    });
}

exports.notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found",
    });
}