import { Router } from "express";
import * as gameController from "../controllers/games.controller";

const gamesRouter = Router();
gamesRouter.get("/games", gameController.listGames);
gamesRouter.post("/games", gameController.createGame);

export default gamesRouter;
