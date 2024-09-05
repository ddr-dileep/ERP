import { Request, Response } from "express";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import projectModel from "../models/project.model";

export const createProjectController = async (
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

    const project = new projectModel({ ...req.body });
    await project.save();
    res.status(201).json(apiSuccessResponse({ project }, "Project created"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getAllProjectsController = async (
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
            "Only authenticated users are allowed to fetch information"
          )
        );
    }
    const projects = await projectModel.find();
    res
      .status(200)
      .json(
        apiSuccessResponse(
          { count: projects.length, projects },
          "Projects fetched successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const getProjectController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Project not found"));
    }
    res.json(apiSuccessResponse({ project }));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const updateProjectController = async (
  req: Request | any,
  res: Response
): Promise<any> => {
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
            "Only authenticated users are allowed to update"
          )
        );
    }

    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Project not found"));
    }

    res.json(apiSuccessResponse({ project }, "Project updated"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export const deleteProjectController = async (
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
            "Only authenticated users are allowed to delete"
          )
        );
    }

    const project = await projectModel.findByIdAndDelete(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json(apiErrorResponse("not_found", "Project not found"));
    }

    res.json(apiSuccessResponse({}, "Project deleted"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};
