import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";

export const generateToken = (payload: ITokenPayload): string => {
  const secret = process.env.JWT_SECRET || "dev_secret";

  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};
