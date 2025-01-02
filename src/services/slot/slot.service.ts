import { TimeSlot } from "../../models/slots/slot.model";
import {
  ISlotRepository,
  Slot,
} from "../../repositories/slot/islot.repository";
import { ISlotService } from "./islot.service";

export class SlotService implements ISlotService {
  private slotRepository: ISlotRepository;
  constructor(slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }
  async createSlot(slotData: Slot): Promise<TimeSlot> {
    return await this.slotRepository.createSlot(slotData);
  }
  async findSlotsByDoctorId(id: string): Promise<TimeSlot[]> {
    return await this.slotRepository.findSlotsByDoctorId(id);
  }
}
