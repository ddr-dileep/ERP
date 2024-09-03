import { Router } from "express";
import { createSystemController } from "../controllers/system.controllers";
import { authMiddleware } from "../utils/token";

const systemRouter = Router();
export default systemRouter;

systemRouter.post("/create", authMiddleware, createSystemController);
