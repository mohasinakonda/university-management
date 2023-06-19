import express from "express";
import { createFaculty, getAllFaculty } from "./faculty.controller";
const router = express.Router();

router.post("/create-faculty", createFaculty);
router.get("/", getAllFaculty);

export const facultyRoutes = router;
