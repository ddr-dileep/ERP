import { Router } from "express";
import rolesRouters from "./roles.routers";
import usreRouters from "./user.routers";
import skillRouter from "./skills.routers";

const rootRouter = Router();

rootRouter.use("/user", usreRouters);
rootRouter.use("/roles", rolesRouters);
rootRouter.use("/skills", skillRouter);

export default rootRouter;
