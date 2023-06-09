import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config";

type IMessage = {
    path: string;
    message: string;
};

const globalErrorHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages: IMessage[] = [];
    res.status(statusCode).json({
        success: false,
        errorMessages,
        message,
        stack: config.env !== "production" ? error.stack : undefined,
    });
    next()
};
export default globalErrorHandler