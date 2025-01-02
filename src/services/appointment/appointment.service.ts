import { IAppointment } from "../../models/appointment/iappointment";
import { IAppointmentRepository } from "../../repositories/appointment/iappointment.repository";
import { IAppointmentService } from "./iappointment.service";

export class AppointmentService implements IAppointmentService {
  private appointmentRepository: IAppointmentRepository;
  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }
  async createAppointment(appointment: IAppointment): Promise<IAppointment> {
    return await this.appointmentRepository.createAppointment(appointment);
  }
  async findAppointmentByIdAndCancel(id: string): Promise<IAppointment | null> {
    const isAppointmentWithIdExists =
      await this.appointmentRepository.findAppointmentByIdAndCancel(id);
    if (!isAppointmentWithIdExists) {
      throw new Error("Invalid appointment id");
    }
    return isAppointmentWithIdExists;
  }
  async findAppointmentById(id: string): Promise<IAppointment | null> {
    const appointment = await this.appointmentRepository.findAppointmentById(
      id
    );
    if (!appointment) {
      throw new Error("Invalid appointment id");
    }
    return appointment;
  }
}
