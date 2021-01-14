import { Router } from "express";

import * as chatroomController from "../controllers/chatroomController";
import { BusinessLogic } from "../types/BusinessLogic";
import { errorHandler } from "../middlewares/errorHandler";
import tokenValidation from '../middlewares/verifyToken';

const router: Router = Router();

const createChatroomHandler: BusinessLogic = errorHandler(chatroomController.createChatroom);

router.post('/', tokenValidation, createChatroomHandler);

export default router;