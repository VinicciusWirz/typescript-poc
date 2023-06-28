import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function schemaValidation(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const logs = validation.error.details.map((d) => d.message);
      return res.status(422).send(logs);
    }
    next();
  };
}
