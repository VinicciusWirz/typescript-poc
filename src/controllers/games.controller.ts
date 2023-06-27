import { Request, Response } from "express";
import httpStatus from "http-status";

export function listGames(req: Request, res: Response) {
  res.status(httpStatus.OK).send("rota get");
}

export function createGame(req: Request, res: Response) {
  res.status(httpStatus.CREATED).send("rota post");
}
