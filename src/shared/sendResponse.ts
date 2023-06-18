import { Response } from "express";
type IData<T> = {
    status: boolean;
    statusCode: number;
    message?: string | null;
    data?: T | null;
};

export const sendResponse = <T>(res: Response, data: IData<T>): void => {
    const response: IData<T> = {
        status: data.status,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    };
    res.status(data.statusCode).json(response);
};
