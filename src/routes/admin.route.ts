import express, { Request, Response } from "express";
import { AdminController } from "../controllers/admin/admin.controller";

export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: express.Router;
  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = express.Router();
    this.setAdminRoutes();
  }
  private setAdminRoutes() {
    this.adminRouter.post("/register", (req: Request, res: Response) =>
      this.adminController.registerAdmin(req, res)
    );
    this.adminRouter.post("/login", (req: Request, res: Response) =>
      this.adminController.loginAdmin(req, res)
    );
    this.adminRouter.get("/patients", (req: Request, res: Response) =>
      this.adminController.getAllPatients(req, res)
    );
    this.adminRouter.get("/doctors", (req: Request, res: Response) =>
      this.adminController.getAllDoctors(req, res)
    );
    this.adminRouter.delete("/doctors/:id", (req: Request, res: Response) =>
      this.adminController.removeDoctor(req, res)
    );
  }
  public getAdminRouter() {
    return this.adminRouter;
  }
}
