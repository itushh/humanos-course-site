import { Router } from "express";
import {
  accessCourse,
  enroll,
  getAll,
  getEnrolledCourses,
  getOne,
} from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const courseRouter = Router();

courseRouter.get("/all", getAll);
courseRouter.get("/enroll/:slug", authMiddleware, enroll);
courseRouter.get("/access/:slug", authMiddleware, accessCourse);
courseRouter.get("/enrolled", authMiddleware, getEnrolledCourses);
courseRouter.get("/:slug", getOne);