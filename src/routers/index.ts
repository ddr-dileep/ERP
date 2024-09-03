import { Router } from "express";
import rolesRouters from "./roles.routers";
import usreRouters from "./user.routers";
import skillRouter from "./skills.routers";
import projectRouter from "./project.routers";
import teamRouter from "./teams.router";
import systemRouter from "./system.routers";

const rootRouter = Router();

rootRouter.use("/user", usreRouters);
rootRouter.use("/roles", rolesRouters);
rootRouter.use("/skills", skillRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/team", teamRouter);
rootRouter.use("/system", systemRouter);

export default rootRouter;
