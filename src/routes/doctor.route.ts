import express, { Request, Response } from "express";
import { DoctorController } from "../controllers/doctor/doctor.controller";
import { SlotController } from "../controllers/slot/slot.controller";

export class DoctorRoute {
  private doctorController: DoctorController;
  private slotController: SlotController;
  private doctorRouter: express.Router;
  constructor(
    doctorController: DoctorController,
    slotController: SlotController
  ) {
    this.doctorController = doctorController;
    this.slotController = slotController;
    this.doctorRouter = express.Router();
    this.setDoctorRoutes();
    this.setSlotRoutes();
  }
  private setDoctorRoutes() {
    this.doctorRouter.post("/register", (req: Request, res: Response) =>
      this.doctorController.registerDoctor(req, res)
    );
    this.doctorRouter.post("/login", (req: Request, res: Response) =>
      this.doctorController.loginDoctor(req, res)
    );
    this.doctorRouter.get("/:id", (req: Request, res: Response) =>
      this.doctorController.getDoctorDetails(req, res)
    );
  }
  private setSlotRoutes() {
    this.doctorRouter.post("/:id/schedule", (req: Request, res: Response) =>
      this.slotController.scheduleTimeSlot(req, res)
    );
    this.doctorRouter.get("/:id/schedule", (req: Request, res: Response) =>
      this.slotController.getAllSlotsOfADoctor(req, res)
    );
  }
  public getDoctorRouter() {
    return this.doctorRouter;
  }
}
