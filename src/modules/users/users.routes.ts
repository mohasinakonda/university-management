import express from "express";
import create_user from "./user.controller";
const router = express.Router();

router.post("/", create_user);

export const userRoute = router;
