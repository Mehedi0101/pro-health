import { HydratedDocument } from "mongoose";
import { IUser } from "./schemas/User.types";

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<IUser>;
    }
  }
}
