// external imports
import { Schema, model } from 'mongoose';
import { ITestResult } from '../types/schemas/TestResult.types';

const testResultSchema = new Schema<ITestResult>({
  test_session_id: { type: Schema.Types.ObjectId, ref: 'TestSession', required: true },
  attachments: [{ type: String }]
}, { timestamps: true });

export const TestResult = model<ITestResult>('TestResult', testResultSchema);
