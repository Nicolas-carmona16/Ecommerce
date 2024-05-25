import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  getProductsByCategoryId,
} from "../controllers/product.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";
import authorizeAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategoryId);
router.post("/", authenticateJWT, authorizeAdmin([1]), createProduct);
router.put("/:id", authenticateJWT, authorizeAdmin([1]), updateProduct);
router.delete("/:id", authenticateJWT, authorizeAdmin([1]), deleteProduct);

export default router;
