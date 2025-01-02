import { Doctor } from "../../models/doctor/doctor";
import { DoctorRepository } from "../../repositories/doctor/doctor.repository";
import { BcryptPass } from "../../utils/bcrypt";
import { IDoctorService } from "./idoctor.service";

export class DoctorService implements IDoctorService {
  private doctorRepository: DoctorRepository;
  private bcryptPass: BcryptPass;
  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
    this.bcryptPass = new BcryptPass();
  }
  async createDoctor(doctor: Doctor): Promise<Doctor> {
    const isDoctorWithTheEmailAlreadyExists =
      await this.doctorRepository.findByEmail(doctor.email);
    if (isDoctorWithTheEmailAlreadyExists) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await this.bcryptPass.hashPassword(doctor.password);
    doctor.password = hashedPassword;
    return await this.doctorRepository.createUser(doctor);
  }
  async loginDoctor(email: string, password: string): Promise<Doctor> {
    const isDoctorWithTheEmailAlreadyExists =
      await this.doctorRepository.findByEmail(email);
    if (!isDoctorWithTheEmailAlreadyExists) {
      throw new Error("Email not exists");
    }
    const isThePasswordMatches = await this.bcryptPass.comparePasswords(
      password,
      isDoctorWithTheEmailAlreadyExists.password
    );
    if (!isThePasswordMatches) {
      throw new Error("Invalid email or password");
    }
    return isDoctorWithTheEmailAlreadyExists;
  }
  async findDoctorById(id: string): Promise<Doctor | null> {
    const isDoctorExists = await this.doctorRepository.findById(id);
    if (!isDoctorExists) {
      throw new Error("Doctor Id is invalid");
    }
    return isDoctorExists;
  }
}
