import { Document } from 'mongoose';

export interface IPayment extends Document {
  invoice_id: string;
  date: Date;
  description: string;
  payment_method: string;
  amount: number;
  status: string;
}
