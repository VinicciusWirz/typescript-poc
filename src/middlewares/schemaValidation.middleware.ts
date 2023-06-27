import { NextFunction, Request, Response } from "express";

export default function schemaValidation(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const logs = validation.error.details.map((d) => d.message);
      return res.status(422).send(logs);
    }
    next();
  };
}
