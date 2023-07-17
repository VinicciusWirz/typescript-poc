import { Request, Response } from "express";
import * as gamesServices from "../services/games.services";
import * as errors from "../errors/errors";
import httpStatus from "http-status";
import { GamePlatform } from "protocols";

export async function listGames(req: Request, res: Response) {
  const game = req.query.game as string;
  const platform = req.query.platform as string;
  const list = await gamesServices.listGames(game, platform);
  res.status(httpStatus.OK).send(list);
}

export async function createGame(req: Request, res: Response) {
  const { game, platform }: GamePlatform = req.body;
  await gamesServices.createGame(game, platform);
  res
    .status(httpStatus.CREATED)
    .send("The game has been added to the database");
}

export async function deleteGameRelation(req: Request, res: Response) {
  const { id: input } = req.params;
  const id = parseInt(input);
  if (isNaN(id) || !id || id <= 0) {
    throw errors.unprocessableEntity(req.params.id);
  }

  await gamesServices.deleteGameRelation(id);
  res.sendStatus(httpStatus.NO_CONTENT);
}

export async function editRelation(req: Request, res: Response) {
  const { id: input } = req.params;
  const id = parseInt(input);
  if (isNaN(id) || !id || id <= 0) {
    throw errors.unprocessableEntity(req.params.id);
  }
  const { game, platform }: GamePlatform = req.body;
  await gamesServices.editRelation(game, platform, id);

  res.sendStatus(httpStatus.OK);
}
