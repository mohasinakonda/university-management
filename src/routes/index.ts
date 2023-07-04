import express from "express";
import { userRoute } from "../modules/users/users.routes";
import { semesterRoute } from "../modules/semister/semesrer.routes";
import { facultyRoutes } from "../modules/faculty/faculty.routes";
import { departmentRouter } from "../modules/department/department.routes";
import { studentRoutes } from "../modules/student/student.routes";
const router = express.Router();

const moduleRoutes = [
    {
        path: "/semester",
        route: semesterRoute,
    },
    {
        path: "/semesters",
        route: semesterRoute,
    },
    {
        path: "/user",
        route: userRoute,
    },
    {
        path: "/faculty",
        route: facultyRoutes,
    },
    {
        path: "/department",
        route: departmentRouter,
    },
    {
        path: "/student",
        route: studentRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const moduleRoute = router;
