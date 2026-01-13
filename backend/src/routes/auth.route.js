import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/check", authMiddleware, check);