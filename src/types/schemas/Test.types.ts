import { Document } from 'mongoose';

export interface ITest extends Document {
  test_name: string;
  test_type: string;
}
