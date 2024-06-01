import express from "express";
import {
  createOrUpdatePaymentMethod,
  getPaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticateJWT, createOrUpdatePaymentMethod);
router.get("/", authenticateJWT, getPaymentMethod);
router.delete("/", authenticateJWT, deletePaymentMethod);

export default router;
