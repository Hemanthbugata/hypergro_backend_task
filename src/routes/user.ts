
import express from "express";
import { signup, login } from "../controllers/userController";

const router = express.Router();

// Register and login routes
router.post("/signup", signup);
router.post("/login", login);

export default router;

