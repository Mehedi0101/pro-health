import { Router } from "express";
import {
  forgotPasswordController,
  login,
  logout,
  register,
  resetPasswordController,
  updatePassword,
  verifyOtpController,
} from "../controllers";
import { requireAuth } from "../middlewares";

const router = Router();

// POST (user register)
router.post("/register", register);

// POST (user login)
router.post("/login", login);

// POST (forgot password)
router.post("/forgot-password", forgotPasswordController);

// POST (verify otp)
router.post("/verify-otp", verifyOtpController);

// POST (reset password)
router.post("/reset-password", resetPasswordController);

// PATCH (update password)
router.patch("/update-password", requireAuth, updatePassword);

// POST (logout)
router.post("/logout", requireAuth, logout);

export default router;
