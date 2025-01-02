import { TimeSlot } from "../../models/slots/slot.model";
import { Slot } from "../../repositories/slot/islot.repository";

export interface ISlotService {
  createSlot(slotData: Slot): Promise<TimeSlot>;
  findSlotsByDoctorId(id: string): Promise<TimeSlot[]>;
}
