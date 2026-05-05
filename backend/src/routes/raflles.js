import { Router } from "express";
import { RaffleController } from "../controllers/raffleController.js"
export const rafllesRouter = Router();

rafllesRouter.get("/", RaffleController.getInitialInfo);
rafllesRouter.post("/save-number-user", RaffleController.saveNumberUser);
