import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";
type UserModel = Model<IUser, object>;
const userSchema = new Schema<IUser, UserModel>(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,

            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser, UserModel>("userSchema", userSchema);
