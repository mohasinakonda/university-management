import { NextFunction, Request, Response } from "express";
import config from "../config";

type IMessage = {
    path: string;
    message: string;
};

const globalErrorHandler = (
    error: TypeError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = 500;
    const message = "Something went wrong";
    const errorMessages: IMessage[] = [];
    res.status(statusCode).json({
        success: false,
        errorMessages,
        message,
        stack: config.env !== "production" ? error.stack : undefined,
    });
    next();
};
export default globalErrorHandler;
