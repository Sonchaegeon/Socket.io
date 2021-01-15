export class HttpError extends Error {
    public readonly status: number;
    public readonly message: string;
    constructor(status: number, message: string) {
        super(message);
        this.message = message;
        this.status = status;
    }
}

export interface Payload {
    id?: any,
    iat: number
}