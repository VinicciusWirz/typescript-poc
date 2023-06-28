import * as gameRepository from "../repositories/games.repository";
import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";
import { ServerResponse } from "protocols";

export async function listGames() {
  const game: undefined = undefined;
  const platform: undefined = undefined;
  const games = await gameRepository.listGames(game, platform);
  return games.rows;
}

export async function createGame(game: string, platform: string) {
  //1st rule => Game cannot be created if the platform doesn't exist
  const platformExists = await platformsRepository.listPlatforms(platform);
  if (!platformExists.rowCount) throw errors.notFoundError("Platform");
  const platformId: number = platformExists.rows[0].id;

  //2nd rule => Only one game per platform can exist
  const gamePlatformRelation = await gameRepository.listGames(game, platform);
  if (gamePlatformRelation.rowCount)
    throw errors.conflictError("Game for Platform");

  const gameInDB = await gameRepository.findGameByName(game);
  if (gameInDB.rowCount) {
    const gameId = gameInDB.rows[0].id;
    await gameRepository.createGameById(gameId, platformId);
  } else {
    await gameRepository.createGame(game, platformId);
  }
}

export async function deleteGameRelation(id: number) {
  const relationExists: ServerResponse = await gameRepository.findRelation(id);
  if (!relationExists.rowCount) throw errors.notFoundError("Relation");

  await gameRepository.deleteRelation(id);
}

export async function listByGames(name: string) {
  const list: ServerResponse = await gameRepository.listByGames(name);
  return list.rows;
}

export async function editRelation(game: string, platform: string, id: number) {
  //1st rule => The relation must exist
  const relationExists: ServerResponse = await gameRepository.findRelation(id);
  const { game: gameFound } = relationExists.rows[0];
  if (game !== gameFound)
    throw errors.unauthorized(`Game is not on relation id`);

  //2nd rule => There cannot be two of the same relations
  const gamePlatformRelation: ServerResponse = await gameRepository.listGames(
    game,
    platform
  );
  if (gamePlatformRelation.rowCount)
    throw errors.conflictError("Game for Platform");

  //3rd rule => The platform must already exist in the db
  const platformExists = await platformsRepository.listPlatforms(platform);
  if (!platformExists.rowCount) throw errors.notFoundError("Platform");
  const platformId: number = platformExists.rows[0].id;

  await gameRepository.editRelation(id, platformId);
}
