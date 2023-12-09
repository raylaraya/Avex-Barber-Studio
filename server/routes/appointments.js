import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/users.js";
import { verifyToken, verifyUser, verifyEmployee } from "../middleware/auth.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
} from "../controllers/appointments.js";

const router = express.Router();

// CREATE
router.post("/", verifyUser, createAppointment);

// GET
router.get("/:id", verifyUser, getAppointment);

// GET ALL
router.get("/", verifyEmployee, getAllAppointments);

// UPDATE
router.put("/:id", verifyUser, updateAppointment);

// DELETE
router.delete("/:id", verifyUser, deleteAppointment);

export default router;
