import { Schema, model } from "mongoose";
import {
    ISemister as ISemester,
    SemisterModel as SemesterModel,
} from "./semisterInterface";
import { ApiError } from "../../app";
import { Code, Month, Title } from "./constant";

const SemesterSchema = new Schema<ISemester>(
    {
        title: {
            type: String,
            required: true,
            enum: Title,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: Code,
        },
        startMonth: {
            type: String,
            required: true,
            enum: Month,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Month,
        },
    },
    {
        timestamps: true,
    }
);
SemesterSchema.pre("save", async function name(next) {
    const isExist = await Semester.findOne({
        title: this.title,
        year: this.year,
    });
    if (isExist) {
        throw new ApiError(409, "Semester is exists!");
    }
    next();
});
export const Semester = model<ISemester, SemesterModel>(
    "Semester",
    SemesterSchema
);
