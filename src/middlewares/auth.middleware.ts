// external imports
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// internal imports
import { User } from "../schemas";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;

    // no token (401)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // token decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // finding user data
    const user = await User.findById(decoded.userId);

    // if no user found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // attaching user info to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
