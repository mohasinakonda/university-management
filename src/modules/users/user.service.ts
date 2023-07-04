import mongoose from "mongoose";
import { ApiError } from "../../app";
import config from "../../config";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { Semester } from "../semister/semistarModel";
import { Student } from "../student/student.model";

//STUDENT SERVICE
export const createStudentService = async (
    student: IStudent,
    user: IUser
): Promise<IUser | null> => {
    if (!user.password) {
        user.password = config.student_default_pass as string;
    }
    user.role = "student";

    const academicSemester = await Semester.findById(student?.academicSemester);

    const session = await mongoose.startSession();
    let newUser = null;
    try {
        session.startTransaction();
        if (academicSemester) {
            const id = await generateStudentId(academicSemester);
            console.log("id", id);
            user.id = id;
            student.id = id;
        }

        const createStudent = await Student.create([student], { session });
        if (!createStudent.length) {
            throw new ApiError(403, "failed to create user");
        }

        user.student = createStudent[0]._id;

        const createUser = await User.create([user], { session });
        if (!createUser.length) {
            throw new ApiError(403, "failed to create user");
        }

        newUser = createUser[0];
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new Error(error as string);
    }

    if (newUser) {
        newUser = await User.findOne({ id: newUser.id }).populate({
            path: "student",
            populate: [
                {
                    path: "academicFaculty",
                },
                {
                    path: "academicDepartment",
                },

                {
                    path: "academicSemester",
                },
            ],
        });
    }
    return newUser;
};
