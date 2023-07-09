import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";

export async function listPlatforms(platform: string) {
  const platformList = await platformsRepository.listPlatforms(platform);
  return platformList;
}

export async function createPlatform(name: string) {
  //1st rule => only one platform can exist
  const platformExists = await platformsRepository.listPlatforms(name);
  if (platformExists.length) throw errors.conflictError("Platform");

  await platformsRepository.createPlatform(name);
  return;
}
