import express from "express";
import { getAllUsers, getUserProfile, updateUserProfile, deleteUser, adminUpdateUserProfile, adminDeleteUser } from "../controllers/user.controller.js";
import authorizeAdmin from "../middlewares/isAdmin.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/users", authorizeAdmin([1]), getAllUsers);
router.get("/profile", authenticateJWT, getUserProfile);
router.put("/update", authenticateJWT, updateUserProfile);
router.delete("/delete", authenticateJWT, deleteUser);

router.put("/admin/update/:id", authenticateJWT, authorizeAdmin([1]), adminUpdateUserProfile);
router.delete("/admin/delete/:id", authenticateJWT, authorizeAdmin([1]), adminDeleteUser);

export default router;
