// external exports
import { Schema, model } from 'mongoose';


import { IBranch } from '../types/schemas/Branch.types';

const branchSchema = new Schema<IBranch>({
  branch_name: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

export const Branch = model<IBranch>('Branch', branchSchema);
