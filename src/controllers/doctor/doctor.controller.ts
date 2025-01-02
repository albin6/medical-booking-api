import { Request, Response } from "express";
import { IDoctorService } from "../../services/doctor/idoctor.service";
import { Doctor } from "../../models/doctor/doctor";

export class DoctorController {
  private doctorService: IDoctorService;
  constructor(doctorService: IDoctorService) {
    this.doctorService = doctorService;
  }
  async registerDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, speciality } = req.body as {
        name: string;
        email: string;
        password: string;
        speciality: string;
      };
      const newDoctor = new Doctor(name, email, password, speciality);
      await this.doctorService.createDoctor(newDoctor);
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
  async loginDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      await this.doctorService.loginDoctor(email, password);
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
  async getDoctorDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const doctor = await this.doctorService.findDoctorById(id);
      res.status(200).json({ success: true, doctor });
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
