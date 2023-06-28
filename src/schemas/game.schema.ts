import Joi from "joi";
import { GamePlatform } from "protocols";

export const gameSchema = Joi.object<GamePlatform>({
  game: Joi.string().required(),
  platform: Joi.string().required(),
});
