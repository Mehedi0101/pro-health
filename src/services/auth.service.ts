import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { IRegisterInput, IUser } from "../types";
import { User } from "../schemas";

export const registerUser = async (
  input: IRegisterInput
): Promise<HydratedDocument<IUser>> => {
  // check existing user
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    const error = new Error("Email already registered") as any;
    error.statusCode = 400;
    throw error;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // create user
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: input.role,
  });

  return user; // full IUser object (with _id, timestamps)
};