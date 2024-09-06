import { Router } from "express";
import { authMiddleware } from "../utils/token";
import {
  createDailyStatus,
  getAllDailyStatusController,
  getDailyStatusByUserIdController,
  getMyDailyStatuses,
  getOneDailyStatusById,
} from "../controllers/daily-status.controllers";
import { dailyStatusCreateMiddleware } from "../middlewares/daily-status.middlewares";

const dailyStatusRouter = Router();
export default dailyStatusRouter;

dailyStatusRouter.post(
  "/create",
  dailyStatusCreateMiddleware,
  authMiddleware,
  createDailyStatus
);

dailyStatusRouter.get("/get-all", authMiddleware, getAllDailyStatusController);

dailyStatusRouter.get(
  "/get-status/:userId",
  authMiddleware,
  getDailyStatusByUserIdController
);

dailyStatusRouter.get("/get-my-status", authMiddleware, getMyDailyStatuses);

dailyStatusRouter.get("/get-one/:id", authMiddleware, getOneDailyStatusById);
