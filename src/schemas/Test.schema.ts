// external imports
import { Schema, model } from 'mongoose';
import { ITest } from '../types/schemas/Test.types';

const testSchema = new Schema<ITest>({
  test_name: { type: String, required: true },
  test_type: { type: String, required: true }
}, { timestamps: true });

export const Test = model<ITest>('Test', testSchema);
