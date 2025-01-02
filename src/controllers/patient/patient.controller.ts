import { Request, Response } from "express";
import { IPatientService } from "../../services/patient/ipatient.service";
import { Patient } from "../../models/patient/patient";

export class PatientController {
  private patientService: IPatientService;
  constructor(patientService: IPatientService) {
    this.patientService = patientService;
  }
  async registerPatient(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };
      const newPatient = new Patient(name, email, password, []);
      await this.patientService.createPatient(newPatient);
      res
        .status(200)
        .json({ success: true, message: "Registation Successful" });
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
  async loginPatient(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      await this.patientService.loginPatient(email, password);
      res.status(200).json({ success: true, message: "Login Successful" });
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
