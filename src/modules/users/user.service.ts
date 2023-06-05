import config from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateId } from "./user.utils";

export const createUser = async (user: IUser): Promise<IUser | null> => {
    const id = await generateId();
    user.id = id;
    // default password
    if (!user.password) {
        user.password = config.student_default_pass as string;
    }

    const createdUser = await User.create(user);

    if (!createUser) {
        throw new Error("Failed to create user!");
    }
    return createdUser;
};
