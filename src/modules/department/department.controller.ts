import { Request, Response } from "express";
import { asyncCatch } from "../../shared/asyncCatch";
import { sendResponse } from "../../shared/sendResponse";
import {
    createDepartmentService,
    deleteDepartmentService,
    getAllDepartmentsService,
    getDepartmentService,
    updateDepartmentService,
} from "./department.service";
import { pick } from "../../shared/pick";

export const createDepartment = asyncCatch(
    async (req: Request, res: Response) => {
        const { ...data } = req.body;
        const result = await createDepartmentService(data);
        const response = {
            status: true,
            statusCode: 200,
            message: "Department Created successfully!!",
            data: result,
        };
        sendResponse(res, response);
    }
);
export const getAllDepartments = asyncCatch(
    async (req: Request, res: Response) => {
        const pagination = pick(req.query, [
            "page",
            "limit",
            "sortBy",
            "sortOrder",
        ]);
        const filter = pick(req.query, ["searchParams", "title"]);
        console.log(req.query);
        const result = await getAllDepartmentsService(filter, pagination);
        const response = {
            status: true,
            statusCode: 200,
            message: "Department fetch successfully!!",
            data: result,
        };

        sendResponse(res, response);
    }
);
export const getDepartment = asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getDepartmentService(id);
    const response = {
        status: true,
        statusCode: 200,
        message: "Department fetch successfully!!",
        data: result,
    };

    sendResponse(res, response);
});
export const UpdateDepartment = asyncCatch(
    async (req: Request, res: Response) => {
        const data = req.body;
        const { id } = req.params;
        const result = await updateDepartmentService(id, data);
        const response = {
            status: true,
            statusCode: 200,
            message: "Department update successfully!!",
            data: result,
        };

        sendResponse(res, response);
    }
);
export const deleteDepartment = asyncCatch(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await deleteDepartmentService(id);
        const response = {
            status: true,
            statusCode: 200,
            message: "Department delete successfully!!",
            data: result,
        };

        sendResponse(res, response);
    }
);
