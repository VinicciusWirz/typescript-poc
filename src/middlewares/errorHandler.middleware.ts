import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { error } from "protocols";

export default function errorHandler(
  error: error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "not-found")
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  if (error.type === "conflict")
    return res.status(httpStatus.CONFLICT).send(error.message);
  if (error.type === "unauthorized")
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
console.log(error)
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
