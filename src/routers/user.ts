import { Router } from "express";

import * as indexController from "../controllers/userController";
import { BusinessLogic } from "../types/BusinessLogic";
import { errorHandler } from "../middlewares/errorHandler";

const router: Router = Router();

const loginHandler: BusinessLogic = errorHandler(indexController.login);
const registerHandler: BusinessLogic = errorHandler(indexController.register);

router.post('/login', loginHandler);
router.post('/register', registerHandler);

export default router;