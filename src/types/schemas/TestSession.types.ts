import { Document, Types } from 'mongoose';

export interface ITestSession extends Document {
  patient_id: Types.ObjectId;
  test_id: Types.ObjectId;
  assigned_staff_id: Types.ObjectId;
  date: Date;
  status: string;
}
