import { Schema, model } from "mongoose";
import { ISemister, SemisterModel } from "./semisterInterface";
const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const SemesterSchema = new Schema<ISemister>(
    {
        title: {
            type: String,
            required: true,
            enum: ["autumn", "sumer", "fall"],
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: ["01", "02", "03"],
        },
        startMonth: {
            type: String,
            required: true,
            enum: month,
        },
        endMonth: {
            type: String,
            required: true,
            enum: month,
        },
    },
    {
        timestamps: true,
    }
);

export const Semester = model<ISemister, SemisterModel>(
    "Semester",
    SemesterSchema
);
