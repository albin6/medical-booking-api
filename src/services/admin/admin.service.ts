import { Admin } from "../../models/admin/admin";
import { Doctor } from "../../models/doctor/doctor";
import { Patient } from "../../models/patient/patient";
import { AdminRepository } from "../../repositories/admin/admin.repository";
import { BcryptPass } from "../../utils/bcrypt";
import { IAdminService } from "./iadmin.service";

export class AdminService implements IAdminService {
  private adminRepository: AdminRepository;
  private bcryptPass: BcryptPass;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
    this.bcryptPass = new BcryptPass();
  }

  async createAdmin(admin: Admin): Promise<Admin> {
    const isAdminWithTheEmailAlreadyExists =
      await this.adminRepository.findByEmail(admin.email);
    if (isAdminWithTheEmailAlreadyExists) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await this.bcryptPass.hashPassword(admin.password);
    admin.password = hashedPassword;
    return await this.adminRepository.createUser(admin);
  }
  async loginAdmin(email: string, password: string): Promise<Admin> {
    const isAdminWithTheEmailAlreadyExists =
      await this.adminRepository.findByEmail(email);
    if (!isAdminWithTheEmailAlreadyExists) {
      throw new Error("Email not exists");
    }
    const isThePasswordMatches = await this.bcryptPass.comparePasswords(
      password,
      isAdminWithTheEmailAlreadyExists.password
    );
    if (!isThePasswordMatches) {
      throw new Error("Invalid email or password");
    }
    return isAdminWithTheEmailAlreadyExists;
  }
  async findAllPatients(): Promise<Patient[] | null> {
    return await this.adminRepository.findPatients();
  }
  async findAllDoctors(): Promise<Doctor[] | null> {
    return await this.adminRepository.findDoctors();
  }
  async findDoctorByIdAndDelete(id: string): Promise<Doctor | null> {
    const isTheDoctorWithIdExists =
      await this.adminRepository.findByIdAndDelete(id);
    if (!isTheDoctorWithIdExists) {
      throw new Error("Invalid doctor id");
    }
    return isTheDoctorWithIdExists;
  }
}
