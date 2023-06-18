import { Response } from "express";

type IGetData<T> = {
    status: boolean;
    statusCode: number;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data?: T | null;
};
export const getResponse = <T>(res: Response, data: IGetData<T>): void => {
    const response: IGetData<T> = {
        status: data.status,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data,
    };
    res.status(data.statusCode).json(response);
};
