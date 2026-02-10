// external imports
import { Schema, model } from 'mongoose';
import { IPackage } from '../types/schemas/Package.types';

const packageSchema = new Schema<IPackage>({
  package_name: { type: String, required: true },
  validity_duration: { type: Number, required: true },
  cost: { type: Number, required: true }
}, { timestamps: true });

export const Package = model<IPackage>('Package', packageSchema);
