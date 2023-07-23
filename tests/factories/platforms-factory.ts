import prisma from "../../src/database/database.connection";
import { faker } from "@faker-js/faker";

export async function createPlatform(name: string = undefined) {
  return await prisma.platform.create({
    data: {
      name: buildPlatform(name).name,
    },
  });
}

export function buildPlatform(name: string = undefined) {
  return {
    id: faker.number.int({ max: 999999 }),
    name: name || faker.company.name(),
  };
}
