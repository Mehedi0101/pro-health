import { Document, Types } from 'mongoose';

export interface ITestResult extends Document {
  test_session_id: Types.ObjectId;
  attachments: string[];
}
