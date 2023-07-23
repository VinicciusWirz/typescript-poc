import { faker } from "@faker-js/faker";
import prisma from "../../src/database/database.connection";
import { buildGame } from "./games-factory";
import { buildPlatform } from "./platforms-factory";

export async function createRelation(game_id: number, platform_id: number) {
  return await prisma.game_platform.create({
    data: {
      game_id,
      platform_id,
    },
  });
}

export function buildRandomRelation(
  game: string = undefined,
  platform: string = undefined
) {
  return {
    id: faker.number.int({ max: 999999 }),
    game: game || buildGame(game).name,
    platform: platform || buildPlatform(platform).name,
  };
}
