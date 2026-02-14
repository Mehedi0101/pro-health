import { HydratedDocument } from "mongoose";
import { Patient, Staff, User } from "../schemas";
import { IUpdateUserInput, IUser } from "../types";

// get me service
export const getMeService = async (userId: string) => {
  // Get base user
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  let profile = null;

  // Role specific data
  if (user.role === "patient") {
    profile = await Patient.findOne({ user_id: user._id });
  }

  if (user.role === "staff") {
    profile = await Staff.findOne({ user_id: user._id }).populate("branch_id");
  }

  return {
    user,
    profile,
  };
};

// update user by id
export const updateUser = async (
  userId: string,
  input: IUpdateUserInput,
): Promise<HydratedDocument<IUser> | null> => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: input },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    const error = new Error("User not found") as any;
    error.statusCode = 404;
    throw error;
  }

  return updatedUser;
};
