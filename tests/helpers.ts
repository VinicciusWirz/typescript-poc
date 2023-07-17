import prisma from "../src/database/database.connection";
import { createRelation } from "./factories/game-platform-factory";
import { createGame, createGameSpecific } from "./factories/games-factory";
import {
  createPlatform,
  createPlatformSpecific,
} from "./factories/platforms-factory";

export async function cleanUp() {
  await prisma.game_platform.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.platform.deleteMany({});
}

export async function generateRelation(
  game_name: string,
  platform_name: string
) {
  const game = await createGameSpecific(game_name);
  const platform = await createPlatformSpecific(platform_name);
  const relation = await createRelation(game.id, platform.id);
  return { relation, game, platform };
}

export async function generateRandomRelation() {
  const game = await createGame();
  const platform = await createPlatform();
  const relation = await createRelation(game.id, platform.id);
  return { relation, game, platform };
}
