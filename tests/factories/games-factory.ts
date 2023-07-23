import prisma from "../../src/database/database.connection";
import { faker } from "@faker-js/faker";

export async function createGame(name: string = undefined) {
  return await prisma.game.create({
    data: {
      name: buildGame(name).name,
    },
  });
}

export function buildGame(name: string = undefined) {
  return {
    id: faker.number.int({ max: 999999 }),
    name: name || faker.commerce.productName(),
  };
}
