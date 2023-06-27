import { Router } from "express";
import * as gameController from "../controllers/games.controller";
import schemaValidation from "middlewares/schemaValidation.middleware";
import { gameSchema } from "schemas/game.schema";

const gamesRouter = Router();
gamesRouter.get("/games", gameController.listGames);
gamesRouter.post(
  "/games",
  schemaValidation(gameSchema),
  gameController.createGame
);

export default gamesRouter;
