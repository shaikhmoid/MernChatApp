import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/auth.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullName").isLength({ min: 2 }).withMessage("Full name is required"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);
router.post("/logout", logout);

router.put("/profile/update", authMiddleware, updateProfile);
router.get("/check", authMiddleware, checkAuth);

export default router;
