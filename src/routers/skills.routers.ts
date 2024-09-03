import { Router } from "express";
import {
  createSkillController,
  deleteSkillController,
  getAllSkill,
  getOneSkillController,
  updateSkillController,
} from "../controllers/skills.controllers";
import { authMiddleware } from "../utils/token";

const skillRouter = Router();

export default skillRouter;

skillRouter.post("/create", authMiddleware, createSkillController);
skillRouter.get("/get-all", getAllSkill);
skillRouter.get("/get-one/:id", getOneSkillController);
skillRouter.delete("/delete/:id", authMiddleware, deleteSkillController);
skillRouter.patch("/update/:id", authMiddleware, updateSkillController);
