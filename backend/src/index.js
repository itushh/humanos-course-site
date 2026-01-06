import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/auth.route.js";
import { courseRouter } from "./routes/course.route.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

/* -------------------- MIDDLEWARES -------------------- */

app.use(
  cors({
    origin: (origin, callback) => {
      //server to server request
      if (!origin) return callback(null, true);

      if (origin === FRONTEND_ORIGIN) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: NODE_ENV,
    message: "Server is running",
  });
});

/* ------------------ START SERVER ------------------ */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        NODE_ENV === "production"
          ? `Production server running on port ${PORT}`
          : `Dev server running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server: ", error.message);
    process.exit(1);
  }
};

startServer();
