import { Patient } from "../../models/patient/patient";
import { PatientRepository } from "../../repositories/patient/patient.repository";
import { BcryptPass } from "../../utils/bcrypt";
import { IPatientService } from "./ipatient.service";

export class PatientService implements IPatientService {
  private patientRepository: PatientRepository;
  private bcryptPass: BcryptPass;
  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
    this.bcryptPass = new BcryptPass();
  }
  async createPatient(patient: Patient): Promise<Patient> {
    const isPatientWithTheEmailAlreadyExists =
      await this.patientRepository.findByEmail(patient.email);
    if (isPatientWithTheEmailAlreadyExists) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await this.bcryptPass.hashPassword(patient.password);
    patient.password = hashedPassword;
    return await this.patientRepository.createUser(patient);
  }
  async loginPatient(email: string, password: string): Promise<Patient> {
    const isPatientWithTheEmailAlreadyExists =
      await this.patientRepository.findByEmail(email);
    if (!isPatientWithTheEmailAlreadyExists) {
      throw new Error("Email not exists");
    }
    const isThePasswordMatches = await this.bcryptPass.comparePasswords(
      password,
      isPatientWithTheEmailAlreadyExists.password
    );
    if (!isThePasswordMatches) {
      throw new Error("Invalid email or password");
    }
    return isPatientWithTheEmailAlreadyExists;
  }
}
