import { Router } from "express";

import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Public
router.route("/login").post(login);
router.route("/register").post(register);

// Protected — require a valid Bearer JWT.
router.route("/add_to_activity").post(authenticate, addToHistory);
router.route("/get_all_activity").get(authenticate, getUserHistory);

export default router;
