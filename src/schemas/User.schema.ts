// external imports
import { Schema, model } from "mongoose";
import { IUser } from "../types/schemas/User.types";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "staff", "patient"] },
    user_image: { type: String },
    phone: { type: String },
    date_of_birth: { type: Date },
    address: { type: String },
    blood_group: { type: String },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
