import { Document, Types } from 'mongoose';

export interface IStaff extends Document {
  user_id: Types.ObjectId;
  branch_id: Types.ObjectId;
}
