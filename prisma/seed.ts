import prisma from "../src/database/database.connection";
type DbTable = { name: string };
const gamesList: DbTable[] = [
  {
    name: "Pokemon: Yellow",
  },
  {
    name: "Pokemon: Red",
  },
  {
    name: "Pokemon: Blue",
  },
  {
    name: "Pokemon: Gold",
  },
  {
    name: "Pokemon: Silver",
  },
  {
    name: "Pokemon: Crystal",
  },
  {
    name: "Pokemon: Ruby",
  },
  {
    name: "Pokemon: Sapphire",
  },
  {
    name: "Pokemon: Emerald",
  },
  {
    name: "Dark Souls",
  },
  {
    name: "Dark Souls II",
  },
  {
    name: "Dark Souls III",
  },
  {
    name: "Elden Ring",
  },
];

const platformsList: DbTable[] = [
  {
    name: "Microsoft Windows",
  },
  {
    name: "Nintendo 64",
  },
  {
    name: "Nintendo GameBoy",
  },
  {
    name: "Nintendo GameBoy Advance",
  },
  {
    name: "Nintendo Switch",
  },
  {
    name: "PlayStation",
  },
  {
    name: "PlayStation 2",
  },
  {
    name: "PlayStation 3",
  },
  {
    name: "PlayStation 4",
  },
  {
    name: "PlayStation 5",
  },
  {
    name: "Xbox One",
  },
  {
    name: "Xbox 360",
  },
  {
    name: "Steam",
  },
];

type RelationDB = { game_id: string; platform_id: string };
const relationsList: RelationDB[] = [
  {
    game_id: "Pokemon: Yellow",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Yellow",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Red",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Red",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Blue",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Blue",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Gold",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Gold",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Silver",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Silver",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Crystal",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Crystal",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Ruby",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Ruby",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Sapphire",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Sapphire",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Pokemon: Emerald",
    platform_id: "Nintendo GameBoy",
  },
  {
    game_id: "Pokemon: Emerald",
    platform_id: "Nintendo GameBoy Advance",
  },
  {
    game_id: "Dark Souls",
    platform_id: "Nintendo Switch",
  },
  {
    game_id: "Dark Souls",
    platform_id: "PlayStation 4",
  },
  {
    game_id: "Dark Souls",
    platform_id: "PlayStation 3",
  },
  {
    game_id: "Dark Souls",
    platform_id: "Xbox 360",
  },
  {
    game_id: "Dark Souls",
    platform_id: "Xbox One",
  },
  {
    game_id: "Dark Souls",
    platform_id: "Microsoft Windows",
  },
  {
    game_id: "Dark Souls",
    platform_id: "Steam",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "PlayStation 4",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "PlayStation 3",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "Xbox 360",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "Xbox One",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "Microsoft Windows",
  },
  {
    game_id: "Dark Souls II",
    platform_id: "Steam",
  },
  {
    game_id: "Dark Souls III",
    platform_id: "PlayStation 4",
  },
  {
    game_id: "Dark Souls III",
    platform_id: "Xbox One",
  },
  {
    game_id: "Dark Souls III",
    platform_id: "Microsoft Windows",
  },
  {
    game_id: "Dark Souls III",
    platform_id: "Steam",
  },
  {
    game_id: "Elden Ring",
    platform_id: "PlayStation 4",
  },
  {
    game_id: "Elden Ring",
    platform_id: "Xbox One",
  },
  {
    game_id: "Elden Ring",
    platform_id: "Microsoft Windows",
  },
  {
    game_id: "Elden Ring",
    platform_id: "Steam",
  },
];

async function creteGames() {
  const games = await prisma.game.createMany({ data: gamesList });
  return games;
}

async function createPlatforms() {
  const platforms = await prisma.platform.createMany({ data: platformsList });
  return platforms;
}

type RelationIds = { game_id: number; platform_id: number };
async function createRelations(list: RelationIds[]) {
  const relations = await prisma.game_platform.createMany({
    data: list,
  });
  return relations;
}

async function main() {
  console.log("populating dabatase");
  await creteGames();
  await createPlatforms();
  const relations = relationsList.map((e) => {
    return {
      game_id: gamesList.findIndex((g) => g.name === e.game_id) + 1,
      platform_id: platformsList.findIndex((p) => p.name === e.platform_id) + 1,
    };
  });
  await createRelations(relations);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
