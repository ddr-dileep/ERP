import { Request, Response } from "express";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import dailyStatusModal from "../models/daily.status.model";
import userModel from "../models/user.models";

export const createDailyStatus = async (req: Request | any, res: Response) => {
  try {
    const existingUser: any = await userModel.findById(req.user.id);
    if (!existingUser.isAccountActive) {
      return res
        .status(403)
        .json(apiErrorResponse("forbidden", "Your account is not active"));
    }

    const existingUserStatus: any = await dailyStatusModal.findOne({
      date: req.body.date,
      user: existingUser._id,
    });

    if (existingUserStatus) {
      return res
        .status(409)
        .json(
          apiErrorResponse(
            "conflict",
            "You've already created a status for this date"
          )
        );
    }

    const status = new dailyStatusModal({
      ...req.body,
      user: existingUser._id,
    });
    await status.save();
    res
      .status(201)
      .json(apiSuccessResponse({ status }, "Daily status created"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
