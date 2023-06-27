import Joi from "joi";

export const gameSchema = Joi.object({
  name: Joi.string().required(),
  platform: Joi.string().required(),
});
