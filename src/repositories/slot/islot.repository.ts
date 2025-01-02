import { TimeSlot } from "../../models/slots/slot.model";

export interface Slot {
  doctor: string;
  day: string;
  time: Date;
}

export interface ISlotRepository {
  createSlot(slotData: Slot): Promise<TimeSlot>;
  findSlotsByDoctorId(id: string): Promise<TimeSlot[]>;
}
