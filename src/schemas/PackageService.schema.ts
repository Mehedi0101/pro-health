// external imports
import { Schema, model } from 'mongoose';
import { IPackageService } from '../types/schemas/PackageService.types';

const packageServiceSchema = new Schema<IPackageService>({
  service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  package_id: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  required_sessions: { type: Number, required: true }
}, { timestamps: true });

export const PackageService = model<IPackageService>('PackageService', packageServiceSchema);
