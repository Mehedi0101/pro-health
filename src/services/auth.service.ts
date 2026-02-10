import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { ILoginInput, IRegisterInput, IUser } from "../types";
import { User } from "../schemas";
import { generateToken } from "../utils";

// register service
export const registerUser = async (
  input: IRegisterInput,
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

// login service
export const loginUser = async (input: ILoginInput) => {
  const { email, password } = input;

  // Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password") as any;
    error.statusCode = 401;
    throw error;
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password") as any;
    error.statusCode = 401;
    throw error;
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { user, token };
};
