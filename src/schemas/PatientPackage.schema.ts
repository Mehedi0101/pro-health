// external imports
import { Schema, model } from 'mongoose';
import { IPatientPackage } from '../types/schemas/PatientPackage.types';

const patientPackageSchema = new Schema<IPatientPackage>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  package_id: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' },
  date_time: { type: Date, required: true },
  status: { type: String, required: true, enum: ['active', 'expired', 'cancelled'], default: 'active' }
}, { timestamps: true });

export const PatientPackage = model<IPatientPackage>('PatientPackage', patientPackageSchema);
