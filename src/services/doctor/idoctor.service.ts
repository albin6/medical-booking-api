import { Doctor } from "../../models/doctor/doctor";
import { TimeSlot } from "../../models/slots/slot.model";

export interface IDoctorService {
  createDoctor(doctor: Doctor): Promise<Doctor>;
  loginDoctor(email: string, password: string): Promise<Doctor>;
  findDoctorById(id: string): Promise<Doctor | null>;
}
