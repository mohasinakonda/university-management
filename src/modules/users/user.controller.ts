import { Request, Response } from "express";
import { createUser } from "./user.service";

const create_user = async (req: Request, res: Response) => {
    const { user } = req.body;

    try {
        const result = await createUser(user);
        return res.status(200).json({
            status: true,
            message: "user created successfully",
            data: result,
        });
    } catch (err) {
        return res.json({
            status: false,
            message: "failed to create user ",
            err,
        });
    }
};

export default create_user;
