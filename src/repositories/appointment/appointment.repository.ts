import { AppointmentModel } from "../../models/appointment/appointment.model";
import { IAppointment } from "../../models/appointment/iappointment";
import { IAppointmentRepository } from "./iappointment.repository";

export class AppointmentRepository implements IAppointmentRepository {
  async createAppointment(appointment: IAppointment): Promise<IAppointment> {
    return await AppointmentModel.create(appointment);
  }
  async findAppointmentByIdAndCancel(id: string): Promise<IAppointment | null> {
    return await AppointmentModel.findByIdAndUpdate(
      id,
      {
        $set: { status: "Cancelled" },
      },
      { new: true }
    );
  }
  async findAppointmentById(id: string): Promise<IAppointment | null> {
    return await AppointmentModel.findById(id)
      .populate({
        path: "patient",
        select: "-password",
      })
      .populate({
        path: "doctor",
        select: "-password",
      })
      .populate("slot");
  }
}
