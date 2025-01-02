import { Doctor } from "../../models/doctor/doctor";
import { DoctorModel } from "../../models/doctor/doctor.model";
import { UserRepository } from "../common/user.repository";

export class DoctorRepository extends UserRepository<Doctor> {
  constructor() {
    super(DoctorModel);
  }
}
