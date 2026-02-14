// external imports
import { Schema, model } from "mongoose";
import { IAppointment } from "../types";

const appointmentSchema = new Schema<IAppointment>(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    service_id: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    branch_id: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
    payment_id: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
    assigned_staff_id: { type: Schema.Types.ObjectId, ref: "Staff" },
    date_time: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true },
);

export const Appointment = model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
