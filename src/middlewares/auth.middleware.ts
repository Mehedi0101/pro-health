// external imports
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

// internal imports
import { User } from "../schemas";

export const requireAuth = async (
  req: Request & { user?: any } & { cookies?: any }, // <--- optional user here
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;

    // no token (401)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
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
