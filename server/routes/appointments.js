import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

export default router;
