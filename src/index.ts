import express, { Request, Response, json } from "express";
import cors from "cors";
import httpStatus from "http-status";
import indexRouter from "./routers/index.router";

const app = express();
app.use(json());
app.use(cors());
app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(httpStatus.OK);
});
app.use(indexRouter);

const PORT: number = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server initiated on ${PORT}`));
