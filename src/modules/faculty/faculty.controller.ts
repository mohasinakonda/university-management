import { Request, Response, response } from "express";
import { asyncCatch } from "../../shared/asyncCatch";

import {
    createFacultyService,
    deleteFacultyService,
    getAllFacultyService,
    getFacultyByIdService,
    updateFacultyService,
} from "./faculty.service";
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

export const getFaculty = asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getFacultyByIdService(id);
    const response = {
        status: true,
        statusCode: 200,
        message: "Faculty retrieved successfully!",
        data: result,
    };
    sendResponse(res, response);
});

export const updateFaculty = asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateFacultyService(id, data);
    const response = {
        status: true,
        statusCode: 200,
        message: "Faculty update Successfully!",
        data: result,
    };
    sendResponse(res, response);
});

export const deleteFaculty = asyncCatch(async (req: Request, res: response) => {
    const { id } = req.params;
    const result = await deleteFacultyService(id);
    const response = {
        status: true,
        statusCode: 200,
        message: "Faculty update Successfully!",
        data: result,
    };
    sendResponse(res, response);
});
