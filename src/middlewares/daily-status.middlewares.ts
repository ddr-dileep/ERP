import { NextFunction, Request, Response } from "express";
import { apiErrorResponse } from "../configs/api/api.response.config";

export const dailyStatusCreateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, status, details, timeSpent, projects, leads } = req.body;

  if (!date || !status || !details || !timeSpent || !projects || !leads) {
    return res.status(400).json(
      apiErrorResponse({
        date: date ? undefined : "Date is required",
        status: status ? undefined : "Status is required",
        details: details ? undefined : "Details are required",
        timeSpent: timeSpent ? undefined : "Time spent is required",
        projects: projects ? undefined : "Projects is required",
        leads: leads ? undefined : "Leads are required",
      })
    );
  }

  next();
};
