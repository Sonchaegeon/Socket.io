import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
import { HttpError } from "./types/HttpError";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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