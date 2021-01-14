import { Request, Response, NextFunction } from "express";

export type BusinessLogic = (req: Request, res: Response, next: NextFunction) => any;