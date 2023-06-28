import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import indexRouter from "./routers/index.router";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();
app.use(json());
app.use(cors());
app.use(indexRouter);
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server initiated on ${PORT}`));
