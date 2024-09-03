import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectController,
  updateProjectController,
} from "../controllers/project.controllers";
import { authMiddleware } from "../utils/token";

const projectRouter = Router();

export default projectRouter;

projectRouter.post("/create", authMiddleware, createProjectController);
projectRouter.get("get-all", authMiddleware, getAllProjectsController);
projectRouter.get("get-one/:id", authMiddleware, getProjectController);
projectRouter.patch("update/:id", authMiddleware, updateProjectController);
projectRouter.delete("/delete/:id", authMiddleware, deleteProjectController);
