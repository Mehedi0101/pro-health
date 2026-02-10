import { Document, Types } from 'mongoose';

export interface IPackageService extends Document {
  service_id: Types.ObjectId;
  package_id: Types.ObjectId;
  required_sessions: number;
}
