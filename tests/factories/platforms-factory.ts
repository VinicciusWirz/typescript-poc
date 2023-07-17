import prisma from "../../src/database/database.connection";
import { faker } from "@faker-js/faker";

export async function createPlatform() {
  return await prisma.platform.create({
    data: {
      name: faker.company.name(),
    },
  });
}

export async function createPlatformSpecific(name: string) {
  return await prisma.platform.create({
    data: {
      name,
    },
  });
}
