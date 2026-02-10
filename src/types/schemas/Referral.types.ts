import { Document, Types } from 'mongoose';

export interface IReferral extends Document {
  referrer_id: Types.ObjectId;
  referred_id: Types.ObjectId;
  date: Date;
  status: string;
}
