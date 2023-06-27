import { Router } from "express";
import gamesRouter from "./games.router";

const indexRouter = Router();
indexRouter.use(gamesRouter);

export default indexRouter;
