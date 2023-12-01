import express from "express";
import { createClient, createEmployee, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/auth/register/client", createClient);
router.post("/auth/register/employee", createEmployee);

export default router;
