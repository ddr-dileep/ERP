import { Request, Response } from "express";
import {
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import dailyStatusModal from "../models/daily.status.model";

export const createDatilyStatus = async (req: Request | any, res: Response) => {
  try {
    const status = new dailyStatusModal(req.body);
    await status.save();
    res.json(apiSuccessResponse({ status }, "Daily status created"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
