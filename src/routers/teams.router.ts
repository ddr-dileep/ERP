import { Router } from "express";
import {
  createTeamControllers,
  deleteTeamController,
  getAllTeamsController,
  getTeamsController,
} from "../controllers/teams.controllers";
import { authMiddleware } from "../utils/token";

const teamRouter = Router();
export default teamRouter;

teamRouter.post("/create", authMiddleware, createTeamControllers);
teamRouter.get("/get-all", authMiddleware, getAllTeamsController);
teamRouter.get("/get-team/:id", authMiddleware, getTeamsController);
teamRouter.delete("/delete/:id", authMiddleware, deleteTeamController);
