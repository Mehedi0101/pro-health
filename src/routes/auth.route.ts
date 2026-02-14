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

// user register
router.post("/register", register);

// user login
router.post("/login", login);

// forgot password
router.post("/forgot-password", forgotPasswordController);

// verify otp
router.post("/verify-otp", verifyOtpController);

// reset password
router.post("/reset-password", resetPasswordController);

// update password
router.patch("/update-password", requireAuth, updatePassword);

// logout
router.post("/logout", requireAuth, logout);

export default router;
