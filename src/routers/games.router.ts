import { Router } from "express";
import * as gamesController from "../controllers/games.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { gameSchema } from "../schemas/game.schema";

const gamesRouter = Router();
gamesRouter.get("/games", gamesController.listGames);
gamesRouter.get("/games/:name", gamesController.listByGames);
gamesRouter.post(
  "/games",
  schemaValidation(gameSchema),
  gamesController.createGame
);
gamesRouter.delete("/games/relation/:id", gamesController.deleteGameRelation);

export default gamesRouter;
