import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export default function errorHandler(
  error: object,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
