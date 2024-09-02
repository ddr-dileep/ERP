import { Router } from "express";
import {
  deleteUserInfoController,
  getUserInfoController,
  loginUserController,
  registerUsercontroller,
  updateUserInfoController,
} from "../controllers/user.controllers";
import {
  loginUserMiddleware,
  registerUsermiddleware,
} from "../middlewares/user.midddlewares";
import { authMiddleware } from "../utils/token";

const usreRouters = Router();

export default usreRouters;

usreRouters.post(
  "/create",
  registerUsermiddleware,
  authMiddleware,
  registerUsercontroller
);
usreRouters.post("/login", loginUserMiddleware, loginUserController);
usreRouters.get("/get-info", authMiddleware, getUserInfoController);
usreRouters.patch("/update-info", authMiddleware, updateUserInfoController);
usreRouters.patch("/update-info", authMiddleware, deleteUserInfoController);
