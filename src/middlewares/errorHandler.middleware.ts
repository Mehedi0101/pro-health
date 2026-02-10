// external imports
import { Request, Response, NextFunction } from "express";

// internal imports
import { ICustomError } from "../types";

export const errorHandler = (
  error: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const env = process.env.NODE_ENV || "development";

  // Default values
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // ===== MONGOOSE ERRORS =====

  // 1. Validation Error
  if (error.name === "ValidationError") {
    statusCode = 400;

    message = "Validation Failed";

    // Collect field messages
    const details = Object.values(error.errors || {}).map(
      (err: any) => err.message,
    );

    return sendError(res, env, statusCode, message, details, error);
  }

  // 2. Duplicate Key
  if (error.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";

    const field = Object.keys(error.keyValue || {})[0];

    return sendError(
      res,
      env,
      statusCode,
      `${field} already exists`,
      null,
      error,
    );
  }

  // 3. Cast Error (Invalid ObjectId)
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";

    return sendError(res, env, statusCode, message, null, error);
  }

  // ===== DEFAULT =====
  return sendError(res, env, statusCode, message, null, error);
};

// ===== HELPER FUNCTION =====

const sendError = (
  res: Response,
  env: string,
  statusCode: number,
  message: string,
  details: any,
  error: any,
) => {
  // DEVELOPMENT RESPONSE
  if (env === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      details,
      stack: error.stack,
      error,
    });
  }

  // PRODUCTION RESPONSE (SAFE)
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};
