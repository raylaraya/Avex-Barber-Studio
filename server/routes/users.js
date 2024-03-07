import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/users.js";
import { verifyEmployee, verifyToken, verifyUser } from "../middleware/auth.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you can delete your account");
// });

// router.get("/checkemployee/:id", verifyEmployee, (req, res, next) => {
//   res.send("Hello employee, you are authorized to delete all accounts");
// });

/* Verify User */
router.get("/verify", verifyToken, getUser);

/* Get specific user using user's ObjectId */
router.get("/:id", verifyUser, getUser);

/* Update User */
router.put("/:id", verifyUser, updateUser);

/* Delete User */
router.delete("/:id", verifyUser, deleteUser);

export default router;
