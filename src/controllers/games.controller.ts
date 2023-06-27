import { Request, Response } from "express";
import * as gamesServices from "../services/games.services";
import httpStatus from "http-status";

export async function listGames(req: Request, res: Response) {
  const list: [] = await gamesServices.listGames();
  res.status(httpStatus.OK).send(list);
}

export async function createGame(req: Request, res: Response) {
  const { game, platform } = req.body;
  await gamesServices.createGame(game, platform);
  res
    .status(httpStatus.CREATED)
    .send("The game has been added to the database");
}
