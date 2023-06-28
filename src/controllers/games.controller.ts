import { Request, Response } from "express";
import * as gamesServices from "../services/games.services";
import * as errors from "../errors/errors";
import httpStatus from "http-status";
import { GamePlatform } from "protocols";

export async function listGames(req: Request, res: Response) {
  const list = await gamesServices.listGames();
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
  const id = parseInt(req.params.id);
  if (isNaN(id)) throw errors.unprocessableEntity(req.params.id);

  await gamesServices.deleteGameRelation(id);
  res.sendStatus(httpStatus.NO_CONTENT);
}

export async function listByGames(req: Request, res: Response) {
  const game: string = req.params.game;

  if (!game || game === "") throw errors.unprocessableEntity(game);
  const list = await gamesServices.listByGames(game);
  res.status(httpStatus.OK).send(list);
}

export async function editRelation(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) throw errors.unprocessableEntity(req.params.id);
  const { game, platform }: GamePlatform = req.body;
  await gamesServices.editRelation(game, platform, id);

  res.sendStatus(httpStatus.OK);
}
