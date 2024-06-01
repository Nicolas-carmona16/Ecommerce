import express from "express";
import {
  createOrUpdateAddress,
  getAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - state
 *         - country
 *         - zipCode
 *       properties:
 *         street:
 *           type: string
 *           description: The street of the address
 *         city:
 *           type: string
 *           description: The city of the address
 *         state:
 *           type: string
 *           description: The state of the address
 *         country:
 *           type: string
 *           description: The country of the address
 *         zipCode:
 *           type: string
 *           description: The zip code of the address
 *       example:
 *         street: 123 Main St
 *         city: Medellin
 *         state: Antioquia
 *         country: Colombia
 *         zipCode: 050001
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Create or update an address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The address was successfully updated
 *       201:
 *         description: The address was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/", authenticateJWT, createOrUpdateAddress);

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get the user address
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: The address of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: No address found
 *       500:
 *         description: Some server error
 */
router.get("/", authenticateJWT, getAddress);

/**
 * @swagger
 * /api/address:
 *   delete:
 *     summary: Delete the user address
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: The address was successfully deleted
 *       404:
 *         description: Address not found
 *       500:
 *         description: Some server error
 */
router.delete("/", authenticateJWT, deleteAddress);

export default router;
