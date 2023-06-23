import { Schema, model } from "mongoose";
import { IDepartment, IDepartmentModel } from "./department.interface";

const departmentSchema = new Schema<IDepartment>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: "faculty",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const Department = model<IDepartment, IDepartmentModel>(
    "departments",
    departmentSchema
);
