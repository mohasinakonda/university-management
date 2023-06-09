import { Model } from "mongoose";
type IMonth =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export type ISemister = {
    title: "autumn" | "sumer" | "fall";
    year: number;
    code: "01" | "02" | "03";
    startMonth: IMonth;
    endMonth: IMonth;
};

export type SemisterModel = Model<ISemister>;
