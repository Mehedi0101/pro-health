import { Document } from 'mongoose';

export interface IService extends Document {
  service_name: string;
  duration: number;
  cost: number;
}
