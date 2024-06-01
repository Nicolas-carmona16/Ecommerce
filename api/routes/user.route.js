import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  adminUpdateUserProfile,
  adminDeleteUser,
} from "../controllers/user.controller.js";
import authorizeAdmin from "../middlewares/isAdmin.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's first name
 *         lastname:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         name: John
 *         lastname: Doe
 *         email: johndoe@example.com
 *         password: password123
 */

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error retrieving users
 */
router.get("/users", authorizeAdmin([1]), getAllUsers);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user profile
 */
router.get("/profile", authenticateJWT, getUserProfile);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update the user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user profile
 */
router.put("/update", authenticateJWT, updateUserProfile);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete the user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user profile
 */
router.delete("/delete", authenticateJWT, deleteUser);

/**
 * @swagger
 * /api/user/admin/update/{id}:
 *   put:
 *     summary: Admin update a user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user profile
 */
router.put(
  "/admin/update/:id",
  authenticateJWT,
  authorizeAdmin([1]),
  adminUpdateUserProfile
);

/**
 * @swagger
 * /api/user/admin/delete/{id}:
 *   delete:
 *     summary: Admin delete a user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user profile
 */
router.delete(
  "/admin/delete/:id",
  authenticateJWT,
  authorizeAdmin([1]),
  adminDeleteUser
);

export default router;
