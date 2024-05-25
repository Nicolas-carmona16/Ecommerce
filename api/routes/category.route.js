import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";
import authorizeAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authenticateJWT, authorizeAdmin([1]), createCategory);
router.put("/:id", authenticateJWT, authorizeAdmin([1]), updateCategory);
router.delete("/:id", authenticateJWT, authorizeAdmin([1]), deleteCategory);

export default router;
