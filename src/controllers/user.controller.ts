import { Response, NextFunction, Request } from "express";
import { getMeService, updateUser } from "../services";

/** ----------------------------------
 * @desc    get me
 * @route   GET /api/v1/users/getMe
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

/** ----------------------------------
 * @desc    update me
 * @route   POST /api/v1/users/getMe
 * @access  Users
 */
export const updateMe = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await updateUser(req.user._id.toString(), req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
