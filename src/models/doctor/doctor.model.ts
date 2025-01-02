import mongoose from "mongoose";
import { Doctor } from "./doctor";

const DoctorSchema = new mongoose.Schema<Doctor>({
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
  },
  speciality: {
    type: String,
    required: true,
  },
});

export const DoctorModel = mongoose.model<Doctor>("doctor", DoctorSchema);
