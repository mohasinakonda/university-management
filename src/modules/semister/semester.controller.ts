import { Request, Response } from "express";
import {
    create_semester,
    deleteSemesterService,
    getAllSemestersService,
    getSemesterService,
    updateSemesterService,
} from "./semester.service";
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
export const getSemester = asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSemesterService(id);
    const response = {
        status: true,
        statusCode: 200,
        message: "Semester fetch successfully!!",

        data: result,
    };

    getResponse(res, response);
});
export const getAllSemesters = asyncCatch(
    async (req: Request, res: Response) => {
        const pagination = pick(req.query, [
            "page",
            "limit",
            "sortBy",
            "sortOrder",
        ]);
        const filter = pick(req.query, ["searchParams", "title", "code"]);
        const result = await getAllSemestersService(filter, pagination);
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

export const updateSemester = asyncCatch(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const result = await updateSemesterService(id, data);
        const response = {
            status: true,
            statusCode: 200,
            message: "Semester update successfully!!",

            data: result,
        };

        getResponse(res, response);
    }
);

export const deleteSemester = asyncCatch(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await deleteSemesterService(id);
        const response = {
            status: true,
            statusCode: 200,
            message: "Semester delete successfully!!",
            data: result,
        };

        getResponse(res, response);
    }
);
