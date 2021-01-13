import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server running on port 3000");
})