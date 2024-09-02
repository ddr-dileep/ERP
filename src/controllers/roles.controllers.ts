import { Request, Response } from "express";
import roleModel from "../models/roles.models";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";

export const createRolesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json(apiErrorResponse("validation_failed", "Name is required"));
    }
    const role = new roleModel({ ...req.body });
    await role.save();
    res
      .status(201)
      .json(apiSuccessResponse({ role }, "Role created successfully"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
};

export async function getAllRolesController(req: Request | any, res: Response) {
  try {
    if (!req.user) {
      return res
        .status(403)
        .json(apiErrorResponse("authentication_error", "authentication_error"));
    }
    const roles = await roleModel.find().select("-createdAt -updatedAt -__v");
    res
      .status(201)
      .json(
        apiSuccessResponse(
          { count: roles.length, roles },
          "Roles fetched successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function updateRoleController(req: Request, res: Response) {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json(apiErrorResponse("validation_failed", "Name is required"));
    }
    const updatedRole = await roleModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select("-createdAt -updatedAt -__v");

    if (!updatedRole) {
      return res
        .status(404)
        .json(apiErrorResponse("authentication_error", "Role not found"));
    }

    res
      .status(200)
      .json(
        apiSuccessResponse({ role: updatedRole }, "Role updated successfully")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function deleteRoleController(req: Request, res: Response) {
  try {
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);

    if (!deletedRole) {
      return res
        .status(404)
        .json(apiErrorResponse("authentication_error", "Role not found"));
    }

    res
      .status(200)
      .json(
        apiSuccessResponse({ role: deletedRole }, "Role deleted successfully")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}
