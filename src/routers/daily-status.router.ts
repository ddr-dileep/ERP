import { Router } from "express";
import { authMiddleware } from "../utils/token";
import { createDatilyStatus } from "../controllers/daily-status.controllers";
import { dailyStatusCreateMiddleware } from "../middlewares/daily-status.middlewares";

const dailyStatusRouter = Router();
export default dailyStatusRouter;

dailyStatusRouter.post(
  "/create",
  dailyStatusCreateMiddleware,
  authMiddleware,
  createDatilyStatus
);
