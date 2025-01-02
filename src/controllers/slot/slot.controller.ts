import { Request, Response } from "express";
import { ISlotService } from "../../services/slot/islot.service";

export class SlotController {
  private slotService: ISlotService;
  constructor(slotService: ISlotService) {
    this.slotService = slotService;
  }
  async scheduleTimeSlot(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const slotData = req.body as {
        day: string;
        time: Date;
      };
      const slot = await this.slotService.createSlot({
        doctor: id,
        ...slotData,
      });
      res.status(200).json({ success: true, message: "Slot scheduled", slot });
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
  async getAllSlotsOfADoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const slots = await this.slotService.findSlotsByDoctorId(id);
      res.status(200).json({ success: true, slots });
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
