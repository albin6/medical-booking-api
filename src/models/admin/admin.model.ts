import mongoose from "mongoose";
import { Admin } from "./admin";

const AdminSchema = new mongoose.Schema<Admin>({
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
  assignedHospital: {
    type: String,
    required: true,
  },
});

export const AdminModel = mongoose.model<Admin>("admin", AdminSchema);
