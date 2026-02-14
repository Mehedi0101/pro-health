import bcrypt from "bcrypt";
import mongoose, { HydratedDocument } from "mongoose";
import {
  IForgotPasswordInput,
  ILoginInput,
  IRegisterInput,
  IResetPasswordInput,
  IUpdatePasswordInput,
  IUser,
  IVerifyOtpInput,
} from "../types";
import { PasswordReset, Patient, Staff, User } from "../schemas";
import {
  generateOTP,
  generateReferralLink,
  generateToken,
  generateUniqueReferralCode,
} from "../utils";
import { sendOtpEmail } from "./mail.service";

// ---------- register service ----------
export const registerUser = async (
  input: IRegisterInput,
): Promise<HydratedDocument<IUser>> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Checking existing user
    const existingUser = await User.findOne({ email: input.email }).session(
      session,
    );

    if (existingUser) {
      const error = new Error("Email already registered") as any;
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create base user
    const user = await User.create(
      [
        {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          role: input.role,
        },
      ],
      { session },
    );

    const createdUser = user[0];

    // PATIENT
    if (input.role === "patient") {
      const code = await generateUniqueReferralCode();

      await Patient.create(
        [
          {
            user_id: createdUser._id,
            referral_code: code,
            referral_link: generateReferralLink(code),
          },
        ],
        { session },
      );
    }

    // STAFF
    else if (input.role === "staff") {
      await Staff.create(
        [
          {
            user_id: createdUser._id,
          },
        ],
        { session },
      );
    }

    // Commit
    await session.commitTransaction();

    return createdUser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

//---------- login service ----------
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

//---------- forgot password service ----------
export const forgotPassword = async (input: IForgotPasswordInput) => {
  const { email } = input;

  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  // Generate 6 digit OTP
  const otp = generateOTP();

  // Save to DB
  await PasswordReset.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
  });

  // Send email
  await sendOtpEmail(email, otp);
};

// ---------- verify otp service ----------
export const verifyOtp = async (input: IVerifyOtpInput) => {
  const { email, otp } = input;

  // find otp record
  const record = await PasswordReset.findOne({
    email,
    otp,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  // no record found
  if (!record) {
    const error = new Error("Invalid or expired OTP") as any;
    error.statusCode = 400;
    throw error;
  }

  // record found
  return true;
};

// ---------- reset password service ----------
export const resetPassword = async (input: IResetPasswordInput) => {
  const { email, otp, newPassword } = input;

  const record = await PasswordReset.findOne({
    email,
    otp,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    const error = new Error("Invalid or expired OTP") as any;
    error.statusCode = 400;
    throw error;
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await User.updateOne({ email }, { password: hashedPassword });

  // Delete used OTP record
  await PasswordReset.deleteOne({ _id: record._id });
};

// ---------- update password service ----------
export const updatePasswordService = async (
  userId: string,
  input: IUpdatePasswordInput,
): Promise<void> => {
  const { currentPassword, newPassword } = input;

  // Find the user
  const user: HydratedDocument<IUser> | null =
    await User.findById(userId).select("+password");
  if (!user) {
    const error = new Error("User not found") as any;
    error.statusCode = 404;
    throw error;
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    const error = new Error("Current password is incorrect") as any;
    error.statusCode = 400;
    throw error;
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.password = hashedPassword;
  await user.save();
};
