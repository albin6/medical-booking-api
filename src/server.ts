import express, { Application, Request, Response } from "express";
import { PatientRoute } from "./routes/patient.route";
import { PatientRepository } from "./repositories/patient/patient.repository";
import { PatientService } from "./services/patient/patient.service";
import { PatientController } from "./controllers/patient/patient.controller";
import { DoctorRepository } from "./repositories/doctor/doctor.repository";
import { DoctorService } from "./services/doctor/doctor.service";
import { DoctorController } from "./controllers/doctor/doctor.controller";
import { DoctorRoute } from "./routes/doctor.route";
import { AdminRepository } from "./repositories/admin/admin.repository";
import { AdminService } from "./services/admin/admin.service";
import { AdminController } from "./controllers/admin/admin.controller";
import { AdminRoute } from "./routes/admin.route";
import { AppointmentRepository } from "./repositories/appointment/appointment.repository";
import { AppointmentService } from "./services/appointment/appointment.service";
import { AppointmentController } from "./controllers/appointment/appointment.controller";
import { AppointmentRoute } from "./routes/appointment.route";
import { SlotRepository } from "./repositories/slot/slot.repository";
import { SlotService } from "./services/slot/slot.service";
import { SlotController } from "./controllers/slot/slot.controller";

export class Server {
  private app: Application;
  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.setPatientRoutes();
    this.setDoctorRoutes();
    this.setAdminRoutes();
    this.setAppointmentRoutes();
  }
  private setMiddlewares() {
    this.app.use(express.json());
  }
  private setRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Server is running" });
    });
  }
  private setPatientRoutes() {
    const partientController = this.injectPatientDependencies();
    const patientRouter = new PatientRoute(partientController);
    this.app.use("/api/v_1/patients", patientRouter.getPatientRouter());
  }
  private setDoctorRoutes() {
    const doctorController = this.injectDoctorDependencies();
    const slotController = this.injectSlotDependencies();
    const doctorRouter = new DoctorRoute(doctorController, slotController);
    this.app.use("/api/v_1/doctor", doctorRouter.getDoctorRouter());
  }
  private setAdminRoutes() {
    const adminController = this.injectAdminDependencies();
    const adminRouter = new AdminRoute(adminController);
    this.app.use("/api/v_1/admin", adminRouter.getAdminRouter());
  }
  private setAppointmentRoutes() {
    const appointmentController = this.injectAppointmentDependencies();
    const appointmentRouter = new AppointmentRoute(appointmentController);
    this.app.use(
      "/api/v_1/appointment",
      appointmentRouter.getAppointmentRouter()
    );
  }

  private injectPatientDependencies() {
    const patientRepository = new PatientRepository();
    const patientService = new PatientService(patientRepository);
    return new PatientController(patientService);
  }
  private injectDoctorDependencies() {
    const doctorRepository = new DoctorRepository();
    const doctorService = new DoctorService(doctorRepository);
    return new DoctorController(doctorService);
  }
  private injectSlotDependencies() {
    const slotRepository = new SlotRepository();
    const slotService = new SlotService(slotRepository);
    return new SlotController(slotService);
  }
  private injectAdminDependencies() {
    const adminRepository = new AdminRepository();
    const adminService = new AdminService(adminRepository);
    return new AdminController(adminService);
  }
  private injectAppointmentDependencies() {
    const appointmentRepository = new AppointmentRepository();
    const appointmentService = new AppointmentService(appointmentRepository);
    return new AppointmentController(appointmentService);
  }
  public getApp() {
    return this.app;
  }
}
