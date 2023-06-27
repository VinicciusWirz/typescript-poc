import * as platformsRepository from "../repositories/platforms.repository";
export function listPlatforms() {
  return platformsRepository.listPlatforms();
}

export function createPlatform() {
  return platformsRepository.createPlatform();
}
