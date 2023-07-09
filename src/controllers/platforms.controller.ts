import { Request, Response } from "express";
import httpStatus from "http-status";
import * as platformServices from "../services/platforms.services";

export async function listPlatforms(req: Request, res: Response) {
  const platform = req.query.platform as string;
  const list = await platformServices.listPlatforms(platform);
  res.status(httpStatus.OK).send(list);
}

export async function newPlatform(req: Request, res: Response) {
  const platform: string = req.body.platform;
  await platformServices.createPlatform(platform);
  res.status(httpStatus.CREATED).send("Platform was registred");
}
