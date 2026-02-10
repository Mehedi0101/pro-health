// external imports
import { Schema, model } from 'mongoose';
import { IStaff } from '../types/schemas/Staff.types';

const staffSchema = new Schema<IStaff>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true }
}, { timestamps: true });

export const Staff = model<IStaff>('Staff', staffSchema);
