import mongoose from "mongoose";
import { Doctor } from "../doctor/doctor";

export interface TimeSlot {
  doctor: Doctor;
  day: string;
  time: String;
}

const SlotSchema = new mongoose.Schema<TimeSlot>({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export const SlotModel = mongoose.model<TimeSlot>("slot", SlotSchema);
