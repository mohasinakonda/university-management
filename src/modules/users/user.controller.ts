import { Request, Response } from "express";
import { createUserService } from "./user.service";
import { asyncCatch } from "../../shared/asyncCatch";
import { sendResponse } from "../../shared/sendResponse";

const createUser = asyncCatch(async (req: Request, res: Response) => {
    const { ...user } = req.body;
    const result = await createUserService(user);
    const response = {
        status: true,
        statusCode: 200,
        message: "user created successfully!!",
        data: result,
    };
    sendResponse(res, response);
});

export default createUser;
