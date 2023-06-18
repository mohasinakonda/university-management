import { SortOrder } from "mongoose";
import { ApiError } from "../../app";
import { paginationHelper } from "../../helpers/paginationHelper";
import { TitleCodeMapper } from "./constant";
import { IPaginationOption } from "./semester.interface";

import { Semester } from "./semistarModel";
import { ISemister as ISemester } from "./semisterInterface";

type ISemesterGeneric<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};

export const create_semester = async (
    semester: ISemester
): Promise<ISemester | null> => {
    if (TitleCodeMapper[semester.title] !== semester.code) {
        throw new ApiError(400, "Invalid Semester code!");
    }
    const createdSemester = await Semester.create(semester);

    if (!createdSemester) {
        throw new Error("Failed to create semester!");
    }
    return createdSemester;
};

export const getAllSemestersService = async (
    pagination: IPaginationOption
): Promise<ISemesterGeneric<ISemester[]>> => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper(pagination);
    const sortOption: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortOption[sortBy] = sortOrder;
    }
    const result = await Semester.find()
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const total = await Semester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },

        data: result,
    };
};
