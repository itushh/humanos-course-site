import { Router } from "express";
import { enroll, getAll, getOne } from "../controllers/course.controller.js";

export const courseRouter = Router();

courseRouter.get("/:slug", getOne);
courseRouter.get("/all", getAll);
courseRouter.get("/enroll", enroll);