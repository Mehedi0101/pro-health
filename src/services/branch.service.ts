import { Branch } from "../schemas";
import { HydratedDocument } from "mongoose";
import { IBranch } from "../types/schemas/Branch.types";

// get all branches
export const getAllBranches = async (
  search?: string,
): Promise<HydratedDocument<IBranch>[]> => {
  let query = {};

  if (search) {
    query = { branch_name: { $regex: search, $options: "i" } }; // case-insensitive search
  }

  const branches = await Branch.find(query);
  return branches;
};
