// external imports
import { Schema, model } from 'mongoose';
import { IPayment } from '../types/schemas/Payment.types';

const paymentSchema = new Schema<IPayment>({
  invoice_id: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  payment_type: {type: String, required: true, enum: ["full-payment", "pay-at-clinic"]},
  payment_method: { type: String, required: true, enum: ['cash', 'card', 'online', 'insurance'] },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' }
}, { timestamps: true });

export const Payment = model<IPayment>('Payment', paymentSchema);
