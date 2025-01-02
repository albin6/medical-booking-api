import express, { Request, Response } from "express";
import { PatientController } from "../controllers/patient/patient.controller";

export class PatientRoute {
  private patientController: PatientController;
  private patientRouter: express.Router;
  constructor(patientController: PatientController) {
    this.patientController = patientController;
    this.patientRouter = express.Router();
    this.setPatientRoutes();
  }
  private setPatientRoutes() {
    this.patientRouter.post("/register", (req: Request, res: Response) =>
      this.patientController.registerPatient(req, res)
    );
    this.patientRouter.post("/login", (req: Request, res: Response) =>
      this.patientController.loginPatient(req, res)
    );
  }
  public getPatientRouter() {
    return this.patientRouter;
  }
}
