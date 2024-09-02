import { Router } from "express";
import {
  createRolesController,
  deleteRoleController,
  getAllRolesController,
  updateRoleController,
} from "../controllers/roles.controllers";
import { authMiddleware } from "../utils/token";

const rolesRouters = Router();

export default rolesRouters;

rolesRouters.post("/create", authMiddleware, createRolesController);
rolesRouters.get("/get-all", authMiddleware, getAllRolesController);
rolesRouters.patch("/update/:id", authMiddleware, updateRoleController);
rolesRouters.delete("/delete/:id", authMiddleware, deleteRoleController);
