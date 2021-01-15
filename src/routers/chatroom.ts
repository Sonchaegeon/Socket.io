import { Router } from "express";

import * as chatroomController from "../controllers/chatroomController";
import { BusinessLogic } from "../types/BusinessLogic";
import { errorHandler } from "../middlewares/errorHandler";
import tokenValidation from '../middlewares/verifyToken';

const router: Router = Router();

const createChatroomHandler: BusinessLogic = errorHandler(chatroomController.createChatroom);
const getAllChatroomHandler: BusinessLogic = errorHandler(chatroomController.getAllChatroom);

router.post('/', tokenValidation, createChatroomHandler);
router.get('/', tokenValidation, getAllChatroomHandler);

export default router;