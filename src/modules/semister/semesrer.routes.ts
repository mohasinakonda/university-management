import express from "express";
import {
    createSemester,
    getAllSemesters,
    getSemester,
} from "./semester.controller";
// import create_user from "./user.controller";
const router = express.Router();

router.post("/", createSemester);
router.get("/:id", getSemester);
router.get("/", getAllSemesters);

export const semesterRoute = router;
