import { SortOrder } from "mongoose";
import { IPaginationOption } from "../semister/semester.interface";
import { IDepartment, IDepartmentFilter } from "./department.interface";
import { Department } from "./department.model";
import { paginationHelper } from "../../helpers/paginationHelper";

export const createDepartmentService = async (data: IDepartment) => {
    const result = await Department.create(data);
    if (!result) {
        throw new Error("Failed to create Department!!");
    }
    return result;
};

export const getAllDepartmentsService = async (
    filter: IDepartmentFilter,
    pagination: IPaginationOption
) => {
    const { limit, page, sortBy, sortOrder, skip } =
        paginationHelper(pagination);
    const sortOption: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortOption[sortBy] = sortOrder;
    }
    const { title, searchParams } = filter;

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
    const result = await Department.find(whereCondition)
        .populate("academicFaculty")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    if (!result) {
        throw new Error("Failed to fetch Department");
    }
    const total = await Department.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
