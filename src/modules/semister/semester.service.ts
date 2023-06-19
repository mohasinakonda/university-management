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
type IFilter = {
    searchParams: string;
    title: string;
    code: string;
    year: string;
};
export const getAllSemestersService = async (
    filter: IFilter,
    pagination: IPaginationOption
): Promise<ISemesterGeneric<ISemester[]>> => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper(pagination);
    const { searchParams, ...filterData } = filter;

    const andCondition = [];
    if (searchParams) {
        andCondition.push({
            $or: [
                {
                    title: {
                        $regex: searchParams,
                        $options: "i",
                    },
                },
                {
                    code: {
                        $regex: searchParams,
                    },
                },
                {
                    year: !isNaN(Number(searchParams)) && filter.searchParams,
                },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            $and: Object.entries(filterData).map(([key, value]) => {
                return {
                    [key]: value,
                };
            }),
        });
    }

    const sortOption: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortOption[sortBy] = sortOrder;
    }
    const whereCondition =
        andCondition.length > 0 ? { $and: andCondition } : {};

    const result = await Semester.find(whereCondition)
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
export const getSemesterService = async (id: string) => {
    const result = await Semester.findById(id);
    if (result) {
        return result;
    }
};
type IUpdateData = {
    title?: string;
    code?: string;
    year?: number;
};

export const updateSemesterService = async (id: string, data: IUpdateData) => {
    if (data.title && data.year && TitleCodeMapper[data.title] !== data.code) {
        throw new ApiError(400, "Invalid Semester code!");
    }
    return await Semester.findOneAndUpdate({ _id: id }, data, { new: true });
};

export const deleteSemesterService = async (id: string) => {
    return await Semester.findOneAndDelete({ _id: id }, { new: true });
};
