// external imports
import { Schema, model } from 'mongoose';
import { IPatientService } from '../types/schemas/PatientService.types';

const patientServiceSchema = new Schema<IPatientService>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' },
  assigned_staff_id: { type: Schema.Types.ObjectId, ref: 'Staff' },
  date_time: { type: Date, required: true },
  status: { type: String, required: true, enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

export const PatientService = model<IPatientService>('PatientService', patientServiceSchema);
