import { Request, Response } from "express";
import httpStatus from "http-status";
import * as platformServices from "../services/platforms.services";

export async function listPlatforms(req: Request, res: Response) {
  const list = await platformServices.listPlatforms();
  res.status(httpStatus.OK).send(list);
}

export function newPlatform(req: Request, res: Response) {
  res.status(httpStatus.CREATED).send("rota post");
}
