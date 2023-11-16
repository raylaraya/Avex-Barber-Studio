import { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; // path & fileURLToPath allow us to properly set the paths when we configre directories

/* CONFIGURATIONS (MIDDLEWARE/ PACKAGE) */
// These configurations are so we can grab the file url and specifically when we use the modules
// (Only when we use the type modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // allows us to use dotenv files
const app = express(); // invokes express application so we can use middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // cross origin resource sharing policies
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // sets dir of where we keep our assets(images)

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assests");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
