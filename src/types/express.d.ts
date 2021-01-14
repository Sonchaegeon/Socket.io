export {};

declare global {
    namespace Express {
        interface Request {
            payload?: string | object | any;
        }
    }
}