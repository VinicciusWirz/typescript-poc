import * as platformsRepository from "../repositories/platforms.repository";
export async function listPlatforms() {
  const platform = undefined;
  const result = await platformsRepository.listPlatforms(platform);
  return result.rows;
}

export function createPlatform() {
  return platformsRepository.createPlatform();
}
