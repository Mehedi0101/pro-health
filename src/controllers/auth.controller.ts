import { Request, Response, NextFunction } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  updatePasswordService,
  verifyOtp,
} from "../services";
import { ILoginInput } from "../types";

/** ----------------------------------
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser({ name, email, password, role });

    // success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**--------------------------------
 * @desc    User login
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input: ILoginInput = req.body;

    const { user, token } = await loginUser(input);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**--------------------------------
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await forgotPassword(req.body);

    res.status(200).json({
      success: true,
      message: "If email exists, OTP sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**--------------------------------
 * @desc    Verify OTP
 * @route   POST /api/v1/auth/verify-otp
 * @access  Public
 */
export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await verifyOtp(req.body);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**--------------------------------
 * @desc    Reset Password
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await resetPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update logged-in user's password
 * @route   PATCH /api/v1/auth/update-password
 * @access  Private
 */
export const updatePassword = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    await updatePasswordService(userId.toString(), {
      currentPassword,
      newPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Logout current user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
