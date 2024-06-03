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

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: integer
 *           description: The ID of the product
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *       example:
 *         productId: 1
 *         quantity: 2
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Error retrieving cart
 */
router.get("/", authenticateJWT, getCart);

/**
 * @swagger
 * /api/cart/total:
 *   get:
 *     summary: Get the total cost of the user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The total cost of the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   description: The total cost of the cart
 *       500:
 *         description: Error retrieving cart total
 */
router.get("/total", authenticateJWT, getCartTotal);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Product added to cart
 *       500:
 *         description: Error adding product to cart
 */
router.post("/", authenticateJWT, addToCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Error updating cart
 */
router.put("/:productId", authenticateJWT, updateCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Error removing product from cart
 */
router.delete("/:productId", authenticateJWT, deleteFromCart);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear the user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       500:
 *         description: Error clearing cart
 */
router.delete("/", authenticateJWT, clearCart);

/**
 * @swagger
 * /api/cart/summary:
 *   get:
 *     summary: Get the order summary
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The order summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *                 total:
 *                   type: number
 *                   description: The total cost of the order
 *       500:
 *         description: Error retrieving order summary
 */
router.get("/summary", authenticateJWT, getOrderSummary);

export default router;
