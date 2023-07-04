import { Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
    id: string;
    role: string;
    password: string;
    student: Types.ObjectId | IStudent;
    // faculty: Types.ObjectId | IFacultyUser;
    // admin: Types.ObjectId | IAdmin;
};
