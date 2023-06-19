import { Schema, model } from "mongoose";
import { IFaculty, IFacultyModel } from "./faculty.interface";

const FacultySchema = new Schema<IFaculty>(
    {
        title: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

export const Faculty = model<IFaculty, IFacultyModel>("faculty", FacultySchema);
