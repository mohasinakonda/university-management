import express from "express";
import { createSemester } from "./semester.controller";
// import create_user from "./user.controller";
const router = express.Router();

router.post("/semester", createSemester);

export const semesterRoute = router;
