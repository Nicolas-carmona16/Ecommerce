import express from "express";
import {
  signup,
  signin,
  signout,
  createAdmin,
  checkAuth,
} from "../controllers/auth.controller.js";
import authorizeAdmin from "../middlewares/isAdmin.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
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
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */

/**
 * @swagger
 * /api/auth/check:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Authentication status and user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     lastname:
 *                       type: string
 *       401:
 *         description: User not authenticated
 */
router.get("/check", checkAuth)

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email is already used
 *       500:
 *         description: Error registering user
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Wrong credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to login
 */
router.post("/signin", signin);

/**
 * @swagger
 * /api/auth/signout:
 *   get:
 *     summary: Sign out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Signed out successfully
 *       500:
 *         description: Failed to log out
 */
router.get("/signout", signout);

/**
 * @swagger
 * /api/auth/create-admin:
 *   post:
 *     summary: Create a new admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating admin user
 */
router.post("/create-admin", authenticateJWT, authorizeAdmin([1]), createAdmin);

export default router;
