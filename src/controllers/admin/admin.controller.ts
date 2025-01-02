import { Request, Response } from "express";
import { IAdminService } from "../../services/admin/iadmin.service";
import { Admin } from "../../models/admin/admin";

export class AdminController {
  private adminService: IAdminService;
  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }
  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, assignedHospital } = req.body as {
        name: string;
        email: string;
        password: string;
        assignedHospital: string;
      };
      const newAdmin = new Admin(name, email, password, assignedHospital);
      await this.adminService.createAdmin(newAdmin);
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
  async loginAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      await this.adminService.loginAdmin(email, password);
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
  async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.adminService.findAllPatients();
      res.status(200).json({ success: true, patients });
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
  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.adminService.findAllDoctors();
      res.status(200).json({ success: true, doctors });
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
  async removeDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this.adminService.findDoctorByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Removal successful" });
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
