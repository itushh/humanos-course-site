import { Router } from "express";
import { accessCourse, enroll, getAll, getOne } from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const courseRouter = Router();

courseRouter.get("/all", getAll);
courseRouter.get("/:slug", getOne);
courseRouter.get("/enroll/:slug", authMiddleware, enroll);
courseRouter.get("/access/:slug", authMiddleware, accessCourse);