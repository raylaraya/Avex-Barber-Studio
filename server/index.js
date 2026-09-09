import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import appointmentRoutes from "./routes/appointments.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Heroku's router sits in front of the dyno as a single proxy hop, so trust
// its X-Forwarded-For header for accurate client IPs (used by express-rate-limit).
app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3001",
  "https://avex-barbershop-227ef649606a.herokuapp.com", // Heroku domain
  "https://avex-barber-studio-5bf782be4099.herokuapp.com", // Heroku test domain
  "https://avexbarberstudio.com", // custom domain
  "https://www.avexbarberstudio.com", // subdomain
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Baseline limit for all routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for auth routes to blunt credential stuffing / brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many attempts, please try again later." },
});

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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", ...allowedOrigins],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:"],
      },
    },
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors(corsOptions)); // cross origin resource sharing policies
app.use(limiter);

app.use("/auth", authLimiter, authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  if (process.env.NODE_ENV === "production") {
    delete err.stack;
  }
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

const PORT = process.env.PORT || 3001;
console.log("Starting the server...");
app.listen(PORT, () => {
  connect();
  console.log(`Connected to backend on port ${PORT}`);
});
