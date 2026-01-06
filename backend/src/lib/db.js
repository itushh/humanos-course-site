import { config } from "dotenv";
import mongoose from "mongoose";

//config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(
      `Database connection successful! Host: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed! Error: ", error.message);
    process.exit(1);
  }
};

export { connectDB };
