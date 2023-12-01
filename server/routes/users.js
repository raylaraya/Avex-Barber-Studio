import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.put("/:id", updateUser);

/* DELETE */
router.delete("/:id", verifyToken, deleteUser);

export default router;
