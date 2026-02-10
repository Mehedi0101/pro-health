// external imports
import { Schema, model } from 'mongoose';
import { IPatientPackageService } from '../types/schemas/PatientPackageService.types';

const patientPackageServiceSchema = new Schema<IPatientPackageService>({
  patient_service_id: { type: Schema.Types.ObjectId, ref: 'PatientService', required: true },
  patient_package_id: { type: Schema.Types.ObjectId, ref: 'PatientPackage', required: true }
}, { timestamps: true });

export const PatientPackageService = model<IPatientPackageService>('PatientPackageService', patientPackageServiceSchema);
