import { Request, Response } from "express";
import {
  apiErrorResponse,
  apiOtherError,
  apiSuccessResponse,
} from "../configs/api/api.response.config";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import userModel from "../models/user.models";
import { createToken } from "../utils/token";

export async function registerUsercontroller(
  req: Request | any,
  res: Response
) {
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

    const user = new userModel({
      ...req.body,
      password: await hashPassword(req.body.password),
    });
    await user.save();

    res
      .status(201)
      .json(
        apiSuccessResponse({ user: req.body }, "User created successfully")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function loginUserController(req: Request, res: Response) {
  try {
    const user: any = await userModel
      .findOne({ email: req.body.email })
      .populate("role");
    if (!user) {
      return res.status(404).json(apiOtherError("User not found"));
    }

    const isPasswordMatched = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json(apiOtherError("Invalid credentials"));
    }

    const token = await createToken({
      id: user._id,
      isAccountActive: user.isAccountActive,
      role: user.role.name,
    });

    res.json(
      apiSuccessResponse({
        token,
        message: "Login successful",
      })
    );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function getUserInfoController(req: Request | any, res: Response) {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password")
      .populate({ path: "role", select: "_id name" });
    if (!user) {
      return res
        .status(404)
        .json(apiErrorResponse("authentication_error", "User not found"));
    }

    res.status(200).json(apiSuccessResponse({ user }, "User details"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function updateUserInfoController(
  req: Request | any,
  res: Response
) {
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { ...req.body, password: await hashPassword(req.body.password) },
        { new: true }
      )
      .select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json(apiErrorResponse("authentication_error", "User not found"));
    }

    res
      .status(200)
      .json(apiSuccessResponse({ user: updatedUser }, "User updated"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function deleteUserInfoController(
  req: Request | any,
  res: Response
) {
  try {
    const authUsers = req.user.role === "owner" || req.user.role === "hr";
    if (!authUsers) {
      return res
        .status(403)
        .json(
          apiErrorResponse(
            "authentication_error",
            "Only authenticated users are allowed to delete accounts"
          )
        );
    }
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json(apiErrorResponse("authentication_error", "User not found"));
    }

    res.status(200).json(apiSuccessResponse({}, "User deleted"));
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function getAllUsersController(req: Request | any, res: Response) {
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
    const users = await userModel
      .find()
      .select("-password -createdAt -updatedAt -__v")
      .populate({ path: "role", select: "_id name" });
    res
      .status(200)
      .json(
        apiSuccessResponse({ count: users.length, users }, "Users fetched")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}

export async function getAllUserByRoleControllers(req: Request, res: Response) {
  try {
    const users = await userModel
      .find({ role: req.params.role })
      .select("-password -createdAt -updatedAt -__v")
      .populate({ path: "role", select: "_id name" });
    res
      .status(200)
      .json(
        apiSuccessResponse({ count: users.length, users }, "Developers fetched")
      );
  } catch (error) {
    res.status(400).json(apiOtherError(error));
  }
}
