import express from "express";
import {
  createClient,
  createEmployee,
  login,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register/client", createClient);
router.post("/register/employee", createEmployee);

export default router;
