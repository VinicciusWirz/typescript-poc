import Joi from "joi";
import { Platform } from "protocols";

export const platformSchema = Joi.object<Platform>({
  platform: Joi.string().required(),
});
