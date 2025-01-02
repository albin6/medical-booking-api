import express, { Request, Response } from "express";
import { AppointmentController } from "../controllers/appointment/appointment.controller";

export class AppointmentRoute {
  private appointmentController: AppointmentController;
  private appointmentRouter: express.Router;
  constructor(appointmentController: AppointmentController) {
    this.appointmentController = appointmentController;
    this.appointmentRouter = express.Router();
    this.setAppointmentRoutes();
  }
  private setAppointmentRoutes() {
    this.appointmentRouter.post("/book", (req: Request, res: Response) =>
      this.appointmentController.createAppointment(req, res)
    );
    this.appointmentRouter.put("/cancel/:id", (req: Request, res: Response) =>
      this.appointmentController.cancelAppointment(req, res)
    );
    this.appointmentRouter.get("/:id", (req: Request, res: Response) =>
      this.appointmentController.getAppointmentDetails(req, res)
    );
  }
  public getAppointmentRouter() {
    return this.appointmentRouter;
  }
}
