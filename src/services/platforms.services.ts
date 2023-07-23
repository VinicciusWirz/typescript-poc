import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";

export async function listPlatforms(platform: string) {
  return await platformsRepository.listPlatforms(platform);
}

export async function createPlatform(name: string) {
  //1st rule => only one platform can exist
  const platformExists = await platformsRepository.listPlatforms(name);
  if (platformExists.length) throw errors.conflictError("Platform");

  return await platformsRepository.createPlatform(name);
}
