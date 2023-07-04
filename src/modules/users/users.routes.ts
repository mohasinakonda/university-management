import express from "express";
import { createStudent } from "./user.controller";
// import { createStudentService } from "./user.service";
const router = express.Router();

// router.post("/", createUser);
router.post("/create-student", createStudent);

export const userRoute = router;
