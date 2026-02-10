// external imports
import { Schema, model } from 'mongoose';
import { IReferral } from '../types/schemas/Referral.types';

const referralSchema = new Schema<IReferral>({
  referrer_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  referred_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, enum: ['pending', 'completed', 'expired'], default: 'pending' }
}, { timestamps: true });

export const Referral = model<IReferral>('Referral', referralSchema);
