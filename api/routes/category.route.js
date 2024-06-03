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


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         categoryName:
 *           type: string
 *           description: The name of the category
 *       example:
 *         categoryName: Electronics
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error retrieving categories
 */
router.get("/", getCategories);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: The category data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error retrieving category
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating category
 */
router.post("/", authenticateJWT, authorizeAdmin([1]), createCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 */
router.put("/:id", authenticateJWT, authorizeAdmin([1]), updateCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the category to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/:id", authenticateJWT, authorizeAdmin([1]), deleteCategory);

export default router;
