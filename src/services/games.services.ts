import * as gameRepository from "../repositories/games.repository";
import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";

export async function listGames(game: string, platform: string) {
  const games = await gameRepository.listGames(game, platform, undefined);
  return games;
}

export async function createGame(game: string, platform: string) {
  //1st rule => Game cannot be created if the platform doesn't exist
  const platformExists = await platformsRepository.findPlatform(platform);
  if (!platformExists) throw errors.notFoundError("Platform");
  const platformId = platformExists.id;

  //2nd rule => Only one game per platform can exist
  const gamePlatformRelation = await gameRepository.listGames(
    game,
    platform,
    undefined
  );
  if (gamePlatformRelation.length)
    throw errors.conflictError("Game for Platform");

  const gameIsRegistered = await gameRepository.findGameByName(game);
  let gameId = gameIsRegistered?.id;
  if (!gameIsRegistered) {
    const createdGame = await gameRepository.createGame(game);
    gameId = createdGame.id;
  }
  await gameRepository.createRelation(gameId, platformId);
  return;
}

export async function deleteGameRelation(id: number) {
  const relation = await gameRepository.findRelation(id);
  if (!relation) throw errors.notFoundError("Relation");
  await gameRepository.deleteRelation(id);
}

export async function editRelation(game: string, platform: string, id: number) {
  // //1st rule => The relation must exist
  const relationExists = await gameRepository.listGames(
    undefined,
    undefined,
    id
  );
  if (!relationExists.length) throw errors.notFoundError("Relation");

  const gameFound = relationExists[0].game;
  if (game !== gameFound)
    throw errors.unauthorized(`Game is not on relation id`);
  // //2nd rule => There cannot be two of the same relations
  const platformFound = relationExists[0].platform;
  if (game === gameFound && platform === platformFound)
    throw errors.conflictError("Game for Platform");

  //3rd rule => The platform must already exist in the db
  const platformExists = await platformsRepository.findPlatform(platform);
  if (!platformExists) throw errors.notFoundError("Platform");
  const platformId = platformExists.id;
  await gameRepository.editRelation(id, platformId);
}
