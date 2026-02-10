import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/auth.service";

/**
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

    // call service layer
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
    next(err); // pass error to global error handler
  }
};
