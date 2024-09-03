import { Request, Response } from "express";
import systemModels from "../models/system.model";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";

export const createSystemController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json(apiErrorResponse("validation_error", "Name required"));
    }

    const newSystem = await systemModels.create(req.body);

    res.status(201).json(apiSuccessResponse({ system: newSystem }, "created"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
