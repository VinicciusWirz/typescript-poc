import * as platformsRepository from "../repositories/platforms.repository";
export function listPlatforms() {
  const platform = undefined;
  return platformsRepository.listPlatforms(platform);
}

export function createPlatform() {
  return platformsRepository.createPlatform();
}
