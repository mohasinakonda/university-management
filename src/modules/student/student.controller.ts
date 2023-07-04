import { Request, Response } from "express";
import { asyncCatch } from "../../shared/asyncCatch";
import { createStudentService } from "./student.service";
import { sendResponse } from "../../shared/sendResponse";

export const createStudent = asyncCatch(async (res: Response, req: Request) => {
    const { ...studentData } = req.body;
    const result = await createStudentService(studentData);
    const response = {
        status: true,
        statusCode: 200,
        message: "Student Created successfully!",
        data: result,
    };
    sendResponse(res, response);
});
