import prisma from "../src/database/database.connection";
import { createRelation } from "./factories/game-platform-factory";
import { createGame } from "./factories/games-factory";
import { createPlatform } from "./factories/platforms-factory";

export async function cleanUp() {
  await prisma.game_platform.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.platform.deleteMany({});
}

export async function generateRelation(
  game_name: string,
  platform_name: string
) {
  const game = await createGame(game_name);
  const platform = await createPlatform(platform_name);
  const relation = await createRelation(game.id, platform.id);
  return { relation, game, platform };
}
