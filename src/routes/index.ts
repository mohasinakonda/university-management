import express from "express";
import { userRoute } from "../modules/users/users.routes";
import { semesterRoute } from "../modules/semister/semesrer.routes";
const router = express.Router();

const moduleRoutes = [
    {
        path: "/create-semester",
        route: semesterRoute,
    },
    {
        path: "/semesters",
        route: semesterRoute,
    },
    {
        path: "/create-user",
        route: userRoute,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const moduleRoute = router;
