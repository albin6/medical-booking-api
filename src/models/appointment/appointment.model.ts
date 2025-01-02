import mongoose from "mongoose";
import { IAppointment } from "./iappointment";

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    slot: {
      type: mongoose.Types.ObjectId,
      ref: "slot",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<IAppointment>(
  "appointment",
  AppointmentSchema
);
