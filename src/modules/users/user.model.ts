import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";
type UserModel = Model<IUser, object>;
const userSchema = new Schema<IUser, UserModel>(
    {
        id: {
            type: String,
            unique: true,
        },

        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "student",
        },
        // admin:{
        //     type:Schema.Types.ObjectId|IAdmin,
        //     ref:'admins'
        // },
        // faculty:{
        //     type:Schema.Types.ObjectId|IFacultyUser,
        //     ref:'faculties'
        // }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const User = model<IUser, UserModel>("users", userSchema);
