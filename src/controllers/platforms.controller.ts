import { Request, Response } from "express";
import httpStatus from "http-status";

export function listPlatforms(req: Request, res: Response) {
  res.status(httpStatus.OK).send("rota get");
}

export function newPlatform(req: Request, res: Response) {
  res.status(httpStatus.CREATED).send("rota post");
}
