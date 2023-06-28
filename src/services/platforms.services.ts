import * as platformsRepository from "../repositories/platforms.repository";
import * as errors from "../errors/errors";

export async function listPlatforms() {
  const platform: undefined = undefined;
  const result = await platformsRepository.listPlatforms(platform);
  const list = result.rows;
  return list;
}

export async function createPlatform(name: string) {
  //1st rule => only one platform can exist
  const platformExists = await platformsRepository.listPlatforms(name);
  if (platformExists.rowCount) throw errors.conflictError("Platform");

  await platformsRepository.createPlatform(name);
  return;
}
