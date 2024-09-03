import { Request, Response } from "express";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import skillModel from "../models/skills.model";

export const createSkillController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json(apiErrorResponse("validation_failed", "Name is required"));
    }

    const authUsers =
      req.user.role === "owner" ||
      req.user.role === "hr" ||
      req.user.role === "tech-lead" ||
      req.user.role === "admin";

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
    const skill = new skillModel({ ...req.body, createdBy: req.user.id });
    await skill.save();
    res
      .status(200)
      .json(apiSuccessResponse({ skill }, "Skill created successfully"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getAllSkill = async (req: Request, res: Response) => {
  try {
    const skills = await skillModel.find().select("_id name createdBy");
    res
      .status(200)
      .json(
        apiSuccessResponse({ count: skills.length, skills }, "Skills fetched")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getOneSkillController = async (req: Request, res: Response) => {
  try {
    const skill = await skillModel.findById(req.params.id);
    if (!skill) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Skill not found"));
    }
    res.status(200).json(apiSuccessResponse({ skill }, "Skill fetched"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const deleteSkillController = async (
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
        .json(
          apiErrorResponse(
            "authentication_error",
            "Only authenticated users are allowed to create"
          )
        );
    }
    const skill = await skillModel.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Skill not found"));
    }
    res.status(200).json(apiSuccessResponse({}, "Skill deleted"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const updateSkillController = async (
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
        .json(
          apiErrorResponse(
            "authentication_error",
            "Only authenticated users are allowed to create"
          )
        );
    }
    const skill = await skillModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!skill) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Skill not found"));
    }
    res.status(200).json(apiSuccessResponse({ skill }, "Skill updated"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
