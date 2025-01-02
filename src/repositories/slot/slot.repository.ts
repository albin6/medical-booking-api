import { SlotModel, TimeSlot } from "../../models/slots/slot.model";
import { ISlotRepository, Slot } from "./islot.repository";

export class SlotRepository implements ISlotRepository {
  async createSlot(slotData: Slot): Promise<TimeSlot> {
    return await SlotModel.create(slotData);
  }
  async findSlotsByDoctorId(id: string): Promise<TimeSlot[]> {
    return await SlotModel.find({ doctor: id });
  }
}
