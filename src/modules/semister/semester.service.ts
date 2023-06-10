import { Semester } from "./semistarModel";
import { ISemister } from "./semisterInterface";

export const create_semester = async (
    semester: ISemister
): Promise<ISemister | null> => {
    const createdSemester = await Semester.create(semester);

    if (!createdSemester) {
        throw new Error("Failed to create user!");
    }
    return createdSemester;
};
