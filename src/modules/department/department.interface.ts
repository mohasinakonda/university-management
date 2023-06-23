import { Model, Types } from "mongoose";
import { IFaculty } from "../faculty/faculty.interface";

export type IDepartment = {
    title: string;
    academicFaculty: Types.ObjectId | IFaculty;
};
export type IDepartmentModel = Model<IDepartment, Record<string, unknown>>;
export type IDeppertmentFilter = {
    title?: string;
    academicFaculty?: Types.ObjectId;
};
export type IDepartmentFilter = {
    title?: string;
    searchParams?: string;
};
