import prisma from "../database/database.connection";

export async function listGames(
  gameInput: string,
  platformInput: string,
  id: number
) {
  const gamesList = await prisma.game_platform.findMany({
    select: {
      id: true,
      games: {
        select: { name: true },
      },
      platforms: {
        select: { name: true },
      },
    },
    where: {
      id,
      games: {
        name: gameInput
          ? { contains: gameInput, mode: "insensitive" }
          : undefined,
      },
      platforms: {
        name: platformInput
          ? { contains: platformInput, mode: "insensitive" }
          : undefined,
      },
    },
  });

  const formatedList = gamesList.map((e) => ({
    id: e.id,
    game: e.games.name,
    platform: e.platforms.name,
  }));

  return formatedList;
}

export async function createGame(game: string) {
  const gameCreation = await prisma.game.create({ data: { name: game } });
  return gameCreation;
}

export async function findGameByName(game: string) {
  const gameDB = await prisma.game.findUnique({ where: { name: game } });
  return gameDB;
}

export async function createRelation(gameId: number, platformId: number) {
  const relation = await prisma.game_platform.create({
    data: {
      game_id: gameId,
      platform_id: platformId,
    },
  });
  return relation;
}

export async function findRelation(id: number) {
  const relation = await prisma.game_platform.findUnique({ where: { id } });
  return relation;
}

export async function deleteRelation(id: number) {
  const relation = await prisma.game_platform.delete({ where: { id } });
  return relation;
}

export async function editRelation(id: number, platformId: number) {
  const relation = await prisma.game_platform.update({
    data: { platform_id: platformId },
    where: { id },
  });
  return relation;
}
