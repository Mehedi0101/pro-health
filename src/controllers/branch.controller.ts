import { NextFunction, Request, Response } from "express";
import { getAllBranches } from "../services";

/**
 * @desc    Get all branches
 * @route   GET /api/v1/branches
 * @access  Users
 */
export const getBranches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchQuery = req.query.search as string | undefined;

    const branches = await getAllBranches(searchQuery);

    res.status(200).json({
      success: true,
      message: "Branches fetched successfully",
      data: branches,
    });
  } catch (err) {
    next(err);
  }
};
