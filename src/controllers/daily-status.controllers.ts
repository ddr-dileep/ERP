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

export const getAllDailyStatusController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const authUsers =
      req.user.role === "owner" ||
      req.user.role === "hr" ||
      req.user.role === "tech-lead" ||
      req.user.role === "admin";

    if (!authUsers) {
      return res
        .status(403)
        .json(apiErrorResponse("authentication_error", "Unauthorized"));
    }

    const dailyStatuses = await dailyStatusModal
      .find({ user: req.user.id })
      .populate("projects leads");
    res
      .status(200)
      .json(
        apiSuccessResponse(
          { count: dailyStatuses.length, dailyStatuses },
          "Daily statuses fetched"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getDailyStatusByUserIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const authUsers =
      req.user.role === "owner" ||
      req.user.role === "hr" ||
      req.user.role === "tech-lead" ||
      req.user.role === "admin";

    if (!authUsers) {
      return res
        .status(403)
        .json(apiErrorResponse("authentication_error", "Unauthorized"));
    }

    const dailyStatuses = await dailyStatusModal.find({
      user: req.params.userId,
    });
    res
      .status(200)
      .json(
        apiSuccessResponse(
          { count: dailyStatuses.length, dailyStatuses },
          "Daily statuses fetched"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getMyDailyStatuses = async (req: Request | any, res: Response) => {
  try {
    const dailyStatuses = await dailyStatusModal.find({
      user: req.user.id,
    });
    res
      .status(200)
      .json(
        apiSuccessResponse(
          { count: dailyStatuses.length, dailyStatuses },
          "Daily statuses fetched"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getOneDailyStatusById = async (req: Request, res: Response) => {
  try {
    const status = await dailyStatusModal
      .findById(req.params.id)
      .populate({ path: "leads", select: "_id name email " })
      .populate({ path: "projects", select: "_id name startDate client" })
      .populate({
        path: "user",
        select: "_id name email",
        populate: { path: "role", select: "_id name" },
      });
    if (!status) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Status not found"));
    }
    res
      .status(200)
      .json(apiSuccessResponse({ status }, "Daily status fetched"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
