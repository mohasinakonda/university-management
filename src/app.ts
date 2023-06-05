import express, { urlencoded, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./modules/users/users.routes";
import logger from "./shared/logger/logger";
const app = express();
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//routes
app.use("/api/v1", userRoute);

app.get("/", async (req: Request, res: Response) => {
    logger.info("server running successfully!");
    res.send("working successfully!");
});

export default app;
