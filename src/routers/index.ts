import { Router } from "express";
import rolesRouters from "./roles.routers";
import usreRouters from "./user.routers";

const rootRouter = Router();

rootRouter.use("/user", usreRouters);
rootRouter.use("/roles", rolesRouters);

export default rootRouter;
