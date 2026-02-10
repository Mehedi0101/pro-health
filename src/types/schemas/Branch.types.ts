import { Document } from 'mongoose';

export interface IBranch extends Document {
  branch_name: string;
  location: string;
}
