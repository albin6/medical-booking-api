import { Slot } from "../../repositories/slot/islot.repository";
import { Doctor } from "../doctor/doctor";
import { Patient } from "../patient/patient";

export interface IAppointment {
  patient: Patient;
  doctor: Doctor;
  slot: Slot;
  status?: string;
}
