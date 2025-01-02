import { IAppointment } from "../../models/appointment/iappointment";

export interface IAppointmentRepository {
  createAppointment(appointment: IAppointment): Promise<IAppointment>;
  findAppointmentByIdAndCancel(id: string): Promise<IAppointment | null>;
  findAppointmentById(id: string): Promise<IAppointment | null>;
}
