import express from 'express';
import { signup, signin, signout, createAdmin } from '../controllers/auth.controller.js';
import authorizeAdmin from "../middlewares/isAdmin.js";
import authenticateJWT from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/signup', signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/create-admin", authenticateJWT, authorizeAdmin([1]), createAdmin);

export default router;