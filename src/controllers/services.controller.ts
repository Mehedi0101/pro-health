import { Request, Response, NextFunction } from "express";
import { getAllServices } from "../services";

/**
 * @desc    Get all services
 * @route   GET /api/v1/services/
 * @access  Usersr
 */
export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const services = await getAllServices();

    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (err) {
    next(err);
  }
};
