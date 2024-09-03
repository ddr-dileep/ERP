import { Request, Response } from "express";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import teamModel from "../models/teams.model";

export const createTeamControllers = async (
  req: Request | any,
  res: Response
) => {
  try {
    const authUsers = req.user.role === "owner" || req.user.role === "hr";

    if (!authUsers) {
      return res
        .status(403)
        .json(
          apiErrorResponse(
            "authentication_error",
            "Only authenticated users are allowed to create"
          )
        );
    }

    if (!req.body.name) {
      return res
        .status(400)
        .json(apiErrorResponse("validation_error", "Name is required"));
    }

    const team = new teamModel(req.body);
    await team.save();
    res
      .status(201)
      .json(apiSuccessResponse({ team }, "Team created successfully"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getAllTeamsController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const teams = await teamModel.find().select("_id name");
    res
      .status(200)
      .json(
        apiSuccessResponse(
          { count: teams.length, teams },
          "Successfully retrieved teams"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getTeamsController = async (req: Request | any, res: Response) => {
  try {
    const team = await teamModel
      .findById(req.params.id)
      .select("_id name developers");

    if (!team) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Team not found"));
    }

    res.status(200).json(apiSuccessResponse({ team }, "Team fetched"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const deleteTeamController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const authUsers = req.user.role === "owner" || req.user.role === "hr";

    if (!authUsers) {
      return res
        .status(403)
        .json(
          apiErrorResponse(
            "authentication_error",
            "Only authenticated users are allowed to delete"
          )
        );
    }

    const team = await teamModel.findByIdAndDelete(req.params.id);

    if (!team) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Team not found"));
    }

    res.status(200).json(apiSuccessResponse({ team }, "Team deleted"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
