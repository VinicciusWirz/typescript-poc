import Joi from "joi";

export const gameSchema = Joi.object({
  game: Joi.string().required(),
  platform: Joi.string().required(),
});
