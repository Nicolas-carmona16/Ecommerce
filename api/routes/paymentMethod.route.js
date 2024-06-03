import express from "express";
import {
  createOrUpdatePaymentMethod,
  getPaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentMethod:
 *       type: object
 *       required:
 *         - methodType
 *         - provider
 *         - accountNumber
 *         - expiry
 *       properties:
 *         methodType:
 *           type: string
 *           description: The type of payment method (e.g., Credit Card, Debit Card)
 *         provider:
 *           type: string
 *           description: The provider of the payment method (e.g., Visa, MasterCard)
 *         accountNumber:
 *           type: string
 *           description: The account number of the payment method
 *         expiry:
 *           type: string
 *           format: date
 *           description: The expiry date of the payment method
 *       example:
 *         methodType: Credit Card
 *         provider: Visa
 *         accountNumber: 1234567890123456
 *         expiry: 2025-12-31
 */

/**
 * @swagger
 * /api/payment-methods:
 *   post:
 *     summary: Create or update a payment method
 *     tags: [PaymentMethod]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment method created successfully
 *       200:
 *         description: Payment method updated successfully
 *       500:
 *         description: Error creating or updating payment method
 */
router.post("/", authenticateJWT, createOrUpdatePaymentMethod);

/**
 * @swagger
 * /api/payment-methods:
 *   get:
 *     summary: Get the user payment method
 *     tags: [PaymentMethod]
 *     responses:
 *       200:
 *         description: The user's payment method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: No payment method found
 *       500:
 *         description: Error retrieving payment method
 */
router.get("/", authenticateJWT, getPaymentMethod);

/**
 * @swagger
 * /api/payment-methods:
 *   delete:
 *     summary: Delete the user payment method
 *     tags: [PaymentMethod]
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Error deleting payment method
 */
router.delete("/", authenticateJWT, deletePaymentMethod);

export default router;
