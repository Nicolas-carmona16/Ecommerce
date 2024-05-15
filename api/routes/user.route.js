import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import authorizeAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/users", authorizeAdmin([1]), getAllUsers);

export default router;
