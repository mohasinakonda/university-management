import { NextFunction, Request, Response } from "express";

export const asyncCatch = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res);
        } catch (err) {
            next(err);
        }
    };
};
