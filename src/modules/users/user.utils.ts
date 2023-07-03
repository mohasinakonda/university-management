import { ISemister } from "../semister/semisterInterface";
import { User } from "./user.model";

async function findLastUserId(role: string): Promise<string | undefined> {
    const lastUser = await User.findOne({ role }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    console.log("last===", lastUser);
    return lastUser?.id;
}

async function generateUserId(role: string, prefix: string): Promise<string> {
    const currentId = await findLastUserId(role);
    const lastIdNumber = currentId
        ? parseInt(currentId.substring(prefix.length))
        : 0;

    // console.log(lastIdNumber+1);
    const newIdNumber = lastIdNumber + 1;
    const paddedIdNumber = newIdNumber.toString().padStart(5, "0");
    return `${prefix}${paddedIdNumber}`;
}

export async function generateStudentId(semester: ISemister): Promise<string> {
    const { code, year } = semester;
    const yearFirstTwoDigitAndCode = String(year).substring(2) + code;
    return generateUserId("student", yearFirstTwoDigitAndCode);
}

export async function generateFacultyId(): Promise<string> {
    return generateUserId("faculty", "F-");
}

export async function generateAdminId(): Promise<string> {
    return generateUserId("admin", "A-");
}
