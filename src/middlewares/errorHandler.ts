import { BusinessLogic } from "../types/BusinessLogic";

export const errorHandler = (fn: BusinessLogic): BusinessLogic => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next);
        } catch(err) {
            console.error(err);
            return next(err);
        }
    }
}