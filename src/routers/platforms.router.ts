import { Router } from "express";
import * as platformsController from "../controllers/platforms.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { platformSchema } from "../schemas/platform.schema";

const platformsRouter = Router();
platformsRouter.get("/platforms", platformsController.listPlatforms);
platformsRouter.post(
  "/platforms",
  schemaValidation(platformSchema),
  platformsController.newPlatform
);

export default platformsRouter;
