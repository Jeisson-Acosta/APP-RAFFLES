import { RaffleModel } from "../models/raffleModel.js"
import { validateSaveNumberUser } from "../schemas/raffles.js";

export class RaffleController {
  static async getInitialInfo(req, res) {
    const response = await RaffleModel.getInitialInfo();
    return res.json(response);
  }

  static async saveNumberUser(req, res) {
    const validation = validateSaveNumberUser(req.body)
    if (!validation.success) {
      return res.status(400).json({ ok: false, message: JSON.parse(validation.error.message) })
    }
    const response = await RaffleModel.saveNumberUser({ data: validation.data })
    return res.json(response)
  }
}
