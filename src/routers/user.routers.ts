import { Router } from "express";
import {
  deleteUserInfoController,
  getAllUserByRoleControllers,
  getAllUsersController,
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
usreRouters.delete(
  "/delete-info/:id",
  authMiddleware,
  deleteUserInfoController
);
usreRouters.get("/get-all", authMiddleware, getAllUsersController);

usreRouters.get(
  "/get-all-users-by-role/:role",
  authMiddleware,
  getAllUserByRoleControllers
);
