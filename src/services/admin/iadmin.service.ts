import { Admin } from "../../models/admin/admin";
import { Doctor } from "../../models/doctor/doctor";
import { Patient } from "../../models/patient/patient";

export interface IAdminService {
  createAdmin(admin: Admin): Promise<Admin>;
  loginAdmin(email: string, password: string): Promise<Admin>;
  findAllPatients(): Promise<Patient[] | null>;
  findAllDoctors(): Promise<Doctor[] | null>;
  findDoctorByIdAndDelete(id: string): Promise<Doctor | null>;
}
