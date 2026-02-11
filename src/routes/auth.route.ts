import { Router } from "express";
import { forgotPasswordController, login, register, resetPasswordController, verifyOtpController } from "../controllers";

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

export default router;
