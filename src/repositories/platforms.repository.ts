import prisma from "../database/database.connection";

export async function listPlatforms(platform: string) {
  const platforms = await prisma.platform.findMany({
    where: { name: { contains: platform, mode: "insensitive" } },
  });
  return platforms;
}
export async function createPlatform(platform: string) {
  const platformCreation = await prisma.platform.create({
    data: { name: platform },
  });
  return platformCreation;
}

export async function findPlatform(platform: string) {
  const platformDB = await prisma.platform.findUnique({
    where: { name: platform },
  });
  return platformDB;
}
