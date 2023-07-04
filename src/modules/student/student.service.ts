import { ISemister } from "../semister/semisterInterface";
import { generateStudentId } from "../users/user.utils";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

export const createStudentService = async (data: IStudent) => {
    const semester: ISemister = {
        code: "01",
        year: 2025,
    };
    data.id = await generateStudentId(semester);
    const result = await Student.create(data);
    if (!result) {
        throw new Error("Student did not created!");
    }
    return result;
};
