import express from "express";
import {
    createSemester,
    deleteSemester,
    getAllSemesters,
    getSemester,
    updateSemester,
} from "./semester.controller";
// import create_user from "./user.controller";
const router = express.Router();

router.post("/", createSemester);
router.patch("/:id", updateSemester);
router.get("/:id", getSemester);
router.get("/", getAllSemesters);
router.delete("/:id", deleteSemester);

export const semesterRoute = router;
