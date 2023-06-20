import express from "express";
import {
    createFaculty,
    deleteFaculty,
    getAllFaculty,
    getFaculty,
    updateFaculty,
} from "./faculty.controller";
const router = express.Router();

router.post("/create-faculty", createFaculty);
router.get("/:id", getFaculty);
router.get("/", getAllFaculty);
router.patch("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

export const facultyRoutes = router;
