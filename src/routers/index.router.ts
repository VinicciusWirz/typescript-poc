import { Router } from "express";
import gamesRouter from "./games.router";
import platformsRouter from "./platforms.router";

const indexRouter = Router();
indexRouter.use(gamesRouter);
indexRouter.use(platformsRouter);

export default indexRouter;
