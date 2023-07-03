import config from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
    generateAdminId,
    generateFacultyId,
    generateStudentId,
} from "./user.utils";

export const createUserService = async (user: IUser): Promise<IUser | null> => {
    // const semesrer= await Semester.
    const semester = {
        code: "01",
        year: 2024,
    };

    const id =
        (user.role === "student" && (await generateStudentId(semester))) ||
        (user.role === "faculty" && (await generateFacultyId())) ||
        (user.role === "admin" && (await generateAdminId()));

    user.id = id as string;
    // default password
    if (!user.password) {
        user.password = config.student_default_pass as string;
    }

    const createdUser = await User.create(user);

    if (!createdUser) {
        throw new Error("Failed to create user!");
    }
    return createdUser;
};
