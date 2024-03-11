import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import appointmentRoutes from "./routes/appointments.js";
import cookieParser from "cookie-parser";

const app = express(); // invokes express application so we can use middleware
dotenv.config(); // allows us to use dotenv files

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // to allow cookies
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// middlewares
app.use(cookieParser());
app.use(express.json()); // allows us to send JSON object to express server when testing API endpoints (postman)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors(corsOptions)); // cross origin resource sharing policies

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3001, () => {
  connect();
  console.log("Connected to backend");
});
