import { Document, Types } from 'mongoose';

export interface IPatientPackageService extends Document {
  patient_service_id: Types.ObjectId;
  patient_package_id: Types.ObjectId;
}
