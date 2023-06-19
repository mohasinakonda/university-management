import { SortOrder } from "mongoose";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOption } from "../semister/semester.interface";
import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

export const createFacultyService = async (
    faculty: IFaculty
): Promise<IFaculty | null> => {
    const result = await Faculty.create(faculty);
    if (!result) {
        throw new Error("failed to create Faculty");
    }
    return result;
};
type IFacultyFilter = {
    searchParams: string;
    title: string;
};
type IFacultyGeneric<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};
export const getAllFacultyService = async (
    filter: IFacultyFilter,
    pagination: IPaginationOption
): Promise<IFacultyGeneric<IFaculty[]>> => {
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper(pagination);
    const { searchParams, title } = filter;

    const andCondition = [];
    if (searchParams) {
        andCondition.push({
            $or: [
                {
                    title: {
                        $regex: true,
                        $options: "i",
                    },
                },
            ],
        });
    }

    if (title) {
        andCondition.push({
            $and: Object.entries(title).map(([key, value]) => {
                return {
                    [key]: value,
                };
            }),
        });
    }

    const whereCondition =
        andCondition.length > 0 ? { $and: andCondition } : {};
    const sortOption: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortOption[sortBy] = sortOrder;
    }
    const result = await Faculty.find(whereCondition)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const total = await Faculty.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
