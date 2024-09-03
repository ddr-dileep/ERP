import { Router } from "express";
import rolesRouters from "./roles.routers";
import usreRouters from "./user.routers";
import skillRouter from "./skills.routers";
import projectRouter from "./project.routers";
import teamRouter from "./teams.router";

const rootRouter = Router();

rootRouter.use("/user", usreRouters);
rootRouter.use("/roles", rolesRouters);
rootRouter.use("/skills", skillRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/team", teamRouter);

export default rootRouter;
