import { Request, Response } from "express";
import { create_semester, getAllSemestersService } from "./semester.service";
import { asyncCatch } from "../../shared/asyncCatch";
import { sendResponse } from "../../shared/sendResponse";
import { pick } from "../../shared/pick";
import { getResponse } from "../../shared/getResponse";

export const createSemester = asyncCatch(
    async (req: Request, res: Response) => {
        const { ...semester } = req.body;
        const semesterData = await create_semester(semester);

        const response = {
            status: true,
            statusCode: 200,
            message: "Semester created successfully!!",
            data: semesterData,
        };
        sendResponse(res, response);
    }
);
export const getAllSemesters = asyncCatch(
    async (req: Request, res: Response) => {
        const pagination = pick(req.query, [
            "page",
            "limit",
            "sortBy",
            "sortOrder",
        ]);

        const result = await getAllSemestersService(pagination);
        const response = {
            status: true,
            statusCode: 200,
            message: "Semester fetch successfully!!",
            meta: result.meta,
            data: result.data,
        };
        getResponse(res, response);
    }
);
