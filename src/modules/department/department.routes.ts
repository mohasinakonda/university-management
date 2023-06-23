import express from "express";
import { createDepartment, getAllDepartments } from "./department.controller";
const router = express.Router();
router.post("/", createDepartment);
router.get("/", getAllDepartments);

export const departmentRouter = router;
