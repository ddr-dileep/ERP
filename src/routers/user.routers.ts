import { Router } from "express";
import {
  deleteUserInfoController,
  getUserInfoController,
  loginUserController,
  registerUsercontroller,
  updateUserInfoController,
} from "../controllers/user.controllers";
import {
  logonUserMiddleware,
  registerUsermiddleware,
} from "../middlewares/user.midddlewares";
import { authMiddleware } from "../utils/token";

const usreRouters = Router();

export default usreRouters;

usreRouters.post("/create", registerUsermiddleware, registerUsercontroller);
usreRouters.post("/login", logonUserMiddleware, loginUserController);
usreRouters.get("/get-info", authMiddleware, getUserInfoController);
usreRouters.patch("/update-info", authMiddleware, updateUserInfoController);
usreRouters.patch("/update-info", authMiddleware, deleteUserInfoController);
