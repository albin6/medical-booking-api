import { Patient } from "../../models/patient/patient";
import { PatientModel } from "../../models/patient/patient.model";
import { UserRepository } from "../common/user.repository";

export class PatientRepository extends UserRepository<Patient> {
  constructor() {
    super(PatientModel);
  }
}
