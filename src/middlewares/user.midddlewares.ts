import { NextFunction, Request, Response } from "express";
import { apiErrorResponse } from "../configs/api/api.response.config";

export const registerUsermiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(
      apiErrorResponse(
        {
          name: name ? undefined : "Name is required",
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
        },
        "All things are required"
      )
    );
  }

  next();
};

export const logonUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(
      apiErrorResponse(
        {
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
        },
        "All things are required"
      )
    );
  }

  next();
};
