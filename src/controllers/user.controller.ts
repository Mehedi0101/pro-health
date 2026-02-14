import { Response, NextFunction, Request } from "express";
import { getMeService } from "../services";

/** ----------------------------------
 * @desc    get my data
 * @route   POST /api/v1/users/getMe
 * @access  Users
 */
export const getMe = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getMeService(req.user._id.toString());

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
