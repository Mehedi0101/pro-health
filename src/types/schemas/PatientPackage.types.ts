import { Document, Types } from 'mongoose';

export interface IPatientPackage extends Document {
  patient_id: Types.ObjectId;
  branch_id: Types.ObjectId;
  package_id: Types.ObjectId;
  payment_id: Types.ObjectId;
  date_time: Date;
  status: string;
}
