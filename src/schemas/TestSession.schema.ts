// external imports
import { Schema, model } from 'mongoose';
import { ITestSession } from '../types/schemas/TestSession.types';

const testSessionSchema = new Schema<ITestSession>({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  test_id: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  assigned_staff_id: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

export const TestSession = model<ITestSession>('TestSession', testSessionSchema);
