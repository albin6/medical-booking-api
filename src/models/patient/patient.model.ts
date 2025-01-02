import mongoose from "mongoose";
import { Patient } from "./patient";

const PatientSchema = new mongoose.Schema<Patient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  medicalHistory: {
    type: [String],
    required: true,
  },
});

export const PatientModel = mongoose.model<Patient>("patient", PatientSchema);
