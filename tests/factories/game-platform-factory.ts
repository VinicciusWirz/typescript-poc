import prisma from "../../src/database/database.connection";


export async function createRelation(game_id: number, platform_id: number) {
  return await prisma.game_platform.create({
    data: {
      game_id,
      platform_id,
    },
  });
}
