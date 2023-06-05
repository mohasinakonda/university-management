import express from "express";
import create_user from "./user.controller";
const router = express.Router();

router.post("/create-user", create_user);

export default router;
