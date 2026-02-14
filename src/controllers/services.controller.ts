import { Request, Response, NextFunction } from "express";
import { getAllServices } from "../services";

/**
 * @desc    Get all services
 * @route   GET /api/v1/services/
 * @access  Users
 */
export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchQuery = req.query.search as string | undefined;

    const services = await getAllServices(searchQuery);

    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (err) {
    next(err);
  }
};
