import express from "express";
import { config } from "dotenv";

import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/auth.route.js";
import { courseRouter } from "./routes/course.route.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(express.json());

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
