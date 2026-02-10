import { Document } from 'mongoose';

export interface IPackage extends Document {
  package_name: string;
  validity_duration: number;
  cost: number;
}
