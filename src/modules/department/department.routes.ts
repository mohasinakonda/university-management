import express from "express";
import {
    UpdateDepartment,
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getDepartment,
} from "./department.controller";
const router = express.Router();
router.post("/", createDepartment);
router.get("/:id", getDepartment);
router.get("/", getAllDepartments);
router.patch("/:id", UpdateDepartment);
router.delete("/:id", deleteDepartment);

export const departmentRouter = router;
