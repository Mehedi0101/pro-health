import { Patient, Staff, User } from "../schemas";

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
