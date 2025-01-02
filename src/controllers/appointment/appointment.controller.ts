import { Request, Response } from "express";
import { IAppointmentService } from "../../services/appointment/iappointment.service";
import { IAppointment } from "../../models/appointment/iappointment";

export class AppointmentController {
  private appointmentService: IAppointmentService;
  constructor(appointmentService: IAppointmentService) {
    this.appointmentService = appointmentService;
  }
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment = req.body as IAppointment;
      const newAppointment = await this.appointmentService.createAppointment(
        appointment
      );
      res.status(200).json({
        success: true,
        message: "Appointment created",
        newAppointment,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An error occured in server" });
      }
    }
  }
  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this.appointmentService.findAppointmentByIdAndCancel(id);
      res.status(200).json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An error occured in server" });
      }
    }
  }
  async getAppointmentDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const appointmentDetails =
        await this.appointmentService.findAppointmentById(id);
      res.status(200).json({ success: true, appointment: appointmentDetails });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An error occured in server" });
      }
    }
  }
}
