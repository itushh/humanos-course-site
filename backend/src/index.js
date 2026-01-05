import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { courseRouter } from "./routes/course.route.js";

const app = express();
const PORT = process.config.PORT || process.env.DEV_PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    health: "good",
    message: "server is running!",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`running production on port ${PORT}`);
  } else {
    console.log(`running at http://localhost:${PORT}`);
  }
});