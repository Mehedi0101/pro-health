import { Document, Types } from 'mongoose';

export interface IPatient extends Document {
  user_id: Types.ObjectId;
  referral_code: string;
  referral_link: string;
}
