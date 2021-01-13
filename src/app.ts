import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Error Handlers
import * as errorHandlers from './handlers/errorHandlers';
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if(process.env.ENV === 'DEVELOPMENT'){
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
})