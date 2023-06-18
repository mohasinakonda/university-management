import express, { urlencoded, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { moduleRoute } from "./routes";
// import logger from "./shared/logger/logger";
const app = express();
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//routes

app.use("/api/v1", moduleRoute);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: false,
        path: req.originalUrl,
        message: "Not found !!",
    });
    next();
});
export class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string | undefined, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

app.get("/", (req: Request, res: Response) => {
    // throw new ApiError(400, "error occurs");
    res.send("working successfully!");
});

export default app;
