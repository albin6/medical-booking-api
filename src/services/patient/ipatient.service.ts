import { Patient } from "../../models/patient/patient";

export interface IPatientService {
  createPatient(patient: Patient): Promise<Patient>;
  loginPatient(email: string, password: string): Promise<Patient>;
}
