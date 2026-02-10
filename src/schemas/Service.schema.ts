// external imports
import { Schema, model } from 'mongoose';
import { IService } from '../types/schemas/Service.types';

const serviceSchema = new Schema<IService>({
  service_name: { type: String, required: true },
  duration: { type: Number, required: true },
  cost: { type: Number, required: true }
}, { timestamps: true });

export const Service = model<IService>('Service', serviceSchema);
