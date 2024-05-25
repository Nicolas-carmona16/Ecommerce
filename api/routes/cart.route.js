import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  getCartTotal,
  clearCart,
  getOrderSummary,
} from "../controllers/cart.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticateJWT, getCart);
router.get("/total", authenticateJWT, getCartTotal);
router.post("/", authenticateJWT, addToCart);
router.put("/:productId", authenticateJWT, updateCart);
router.delete("/:productId", authenticateJWT, deleteFromCart);
router.delete("/", authenticateJWT, clearCart);
router.get("/summary", authenticateJWT, getOrderSummary);

export default router;
