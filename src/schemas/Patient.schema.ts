// external imports
import { Schema, model } from 'mongoose';
import { IPatient } from '../types/schemas/Patient.types';

const patientSchema = new Schema<IPatient>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referral_code: { type: String, required: true, unique: true },
  referral_link: { type: String, required: true }
}, { timestamps: true });

export const Patient = model<IPatient>('Patient', patientSchema);
