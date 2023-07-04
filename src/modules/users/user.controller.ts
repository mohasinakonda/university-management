import { Request, Response } from "express";
// import { createUserService } from "./user.service";
import { asyncCatch } from "../../shared/asyncCatch";
import { sendResponse } from "../../shared/sendResponse";
import { createStudentService } from "./user.service";

export const createStudent = asyncCatch(async (req: Request, res: Response) => {
    const { student, ...user } = req.body;

    const result = await createStudentService(student, user);
    const response = {
        status: true,
        statusCode: 200,
        message: "user created successfully!!",
        data: result,
    };
    sendResponse(res, response);
});
