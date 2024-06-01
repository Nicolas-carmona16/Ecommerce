import express from "express";
import {
  createOrUpdateAddress,
  getAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticateJWT, createOrUpdateAddress);
router.get("/", authenticateJWT, getAddress);
router.delete("/", authenticateJWT, deleteAddress);

export default router;
