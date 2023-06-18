import { Request, Response } from "express";
import { createUser } from "./user.service";
import { asyncCatch } from "../../shared/asyncCatch";
import { sendResponse } from "../../shared/sendResponse";

const create_user = asyncCatch(async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await createUser(user);
    const response = {
        status: true,
        statusCode: 200,
        message: "Semester created successfully!!",
        data: result,
    };
    sendResponse(res, response);
});

export default create_user;
