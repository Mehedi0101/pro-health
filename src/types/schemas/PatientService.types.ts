import { Document, Types } from 'mongoose';

export interface IPatientService extends Document {
  patient_id: Types.ObjectId;
  service_id: Types.ObjectId;
  branch_id: Types.ObjectId;
  payment_id: Types.ObjectId;
  assigned_staff_id: Types.ObjectId;
  date_time: Date;
  status: string;
}
