import prisma from "../../src/database/database.connection";
import { faker } from "@faker-js/faker";

export async function createGame() {
  return await prisma.game.create({
    data: {
      name: faker.commerce.productName(),
    },
  });
}

export async function createGameSpecific(name: string) {
  return await prisma.game.create({
    data: {
      name,
    },
  });
}
