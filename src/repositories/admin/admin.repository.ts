import { Admin } from "../../models/admin/admin";
import { AdminModel } from "../../models/admin/admin.model";
import { Doctor } from "../../models/doctor/doctor";
import { DoctorModel } from "../../models/doctor/doctor.model";
import { Patient } from "../../models/patient/patient";
import { PatientModel } from "../../models/patient/patient.model";
import { UserRepository } from "../common/user.repository";

export class AdminRepository extends UserRepository<Admin> {
  constructor() {
    super(AdminModel);
  }
  async findPatients(): Promise<Patient[] | null> {
    return await PatientModel.find();
  }
  async findDoctors(): Promise<Doctor[] | null> {
    return await DoctorModel.find();
  }
  async findByIdAndDelete(id: string): Promise<Doctor | null> {
    return await DoctorModel.findByIdAndDelete(id);
  }
}
