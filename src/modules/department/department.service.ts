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

    const result = await Department.find(whereCondition)
        .populate("academicFaculty")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
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

export const getDepartmentService = async (id: string) => {
    const result = await Department.findOne({ _id: id });
    if (!result) {
        throw new Error("Department data not found!!");
    }
    return result.populate("academicFaculty");
};
export const updateDepartmentService = async (
    id: string,
    data: IDepartment
) => {
    const result = await Department.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    if (!result) {
        throw new Error("Department data not found!!");
    }
    return result.populate("academicFaculty");
};
export const deleteDepartmentService = async (id: string) => {
    const result = await Department.findOneAndDelete({ _id: id });
    if (!result) {
        throw new Error("Department data not found!!");
    }
    return result;
};
