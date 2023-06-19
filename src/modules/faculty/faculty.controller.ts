import { Request, Response } from "express";
import { asyncCatch } from "../../shared/asyncCatch";

import { createFacultyService, getAllFacultyService } from "./faculty.service";
import { sendResponse } from "../../shared/sendResponse";
import { pick } from "../../shared/pick";

export const createFaculty = asyncCatch(async (req: Request, res: Response) => {
    const { ...faculty } = req.body;
    const result = await createFacultyService(faculty);

    const response = {
        status: true,
        statusCode: 200,
        message: "Faculty created successfully!!",
        data: result,
    };
    sendResponse(res, response);
});

export const getAllFaculty = asyncCatch(async (req: Request, res: Response) => {
    const pagination = pick(req.query, [
        "page",
        "limit",
        "sortBy",
        "sortOrder",
    ]);
    const filter = pick(req.query, ["searchParams", "title"]);
    const result = await getAllFacultyService(filter, pagination);
    const response = {
        status: true,
        statusCode: 200,
        message: "Faculty retrieved successfully!",
        data: result,
    };
    sendResponse(res, response);
});
