import * as gameRepository from "../repositories/games.repository";
import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";

export async function listGames() {
  const game = undefined;
  const platform = undefined;
  const games = await gameRepository.listGames(game, platform);
  return games.rows;
}

export async function createGame(game: string, platform: string) {
  //1st rule => Game cannot be created if the platform doesn't exist
  const platformExists = await platformsRepository.listPlatforms(platform);
  if (!platformExists.rowCount) throw errors.notFoundError("Platform");
  const platformId: number = parseInt(platformExists.rows[0].id);

  //2nd rule => Only one game per platform can exist
  const gameInDB = await gameRepository.listGames(game, platform);
  if (gameInDB.rowCount) throw errors.conflictError("Game for Platform");

  await gameRepository.createGame(game, platformId);
  return;
}
