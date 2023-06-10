import { NextFunction, Request, Response } from "express";
import { create_semester } from "./semester.service";

export const createSemester = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { ...semester } = req.body;
    console.log(semester);
    try {
        const semesterData = await create_semester(semester);
        res.status(200).json({
            status: true,
            message: "semester created successfully!! ",
            result: semesterData,
        });
    } catch (err) {
        next(err);
    }
};
