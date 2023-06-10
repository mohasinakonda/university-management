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
type ISemesterTitle = "autumn" | "sumer" | "fall";
type ISemesterCode = "01" | "02" | "03";

export type ISemister = {
    title: ISemesterTitle;
    year: number;
    code: ISemesterCode;
    startMonth: IMonth;
    endMonth: IMonth;
};

export type SemisterModel = Model<ISemister>;
