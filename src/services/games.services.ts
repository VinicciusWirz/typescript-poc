import * as gameRepository from "../repositories/games.repository";
export function listGames() {
  return gameRepository.listGames();
}

export function createGame() {
  return gameRepository.createGame();
}
