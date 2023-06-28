import { FullRelation, RequestListing } from "protocols";
import { db } from "../database/database.connection";

export async function listGames(game: string, platform: string) {
  let query: string = `
  SELECT 
    gp.id AS id,
    games.name AS game, 
    platforms.name AS platform 
    FROM games 
    JOIN game_platform gp ON games.id = gp.game_id
    JOIN platforms ON gp.platform_id = platforms.id
  `;
  const params: string[] = [];

  if (game || platform) {
    query += ` WHERE`;
    if (game) {
      params.push(game);
      query += ` games.name ILIKE $${params.length}`;
    }
    if (game && platform) {
      query += ` AND`;
    }
    if (platform) {
      params.push(platform);
      query += ` platforms.name ILIKE $${params.length}`;
    }
  }

  query += `;`;

  const result = await db.query<RequestListing>(query, params);

  const { rows, rowCount } = result;
  return { rows, rowCount };
}
export async function createGame(game: string, platformId: number) {
  const query: string = `WITH new_game AS (
    INSERT INTO games (name) 
    VALUES ($1) 
    RETURNING id
  )
  INSERT INTO game_platform (game_id, platform_id)
  SELECT new_game.id, $2
  FROM new_game;`;
  const params: (string | number)[] = [game, platformId];
  await db.query(query, params);
  return;
}

export async function findGameByName(game: string) {
  const result = await db.query<{ id: number }>(
    `SELECT id FROM games 
      WHERE name = $1;`,
    [game]
  );
  const { rows, rowCount } = result;
  return { rows, rowCount };
}

export async function createGameById(gameId: number, platformId: number) {
  await db.query(
    `INSERT INTO game_platform (game_id, platform_id) VALUES ($1, $2);`,
    [gameId, platformId]
  );
  return;
}

export async function findRelation(id: number) {
  const result = await db.query<FullRelation>(
    `SELECT gp.*, games.name AS game, platforms.name AS platform
   FROM game_platform gp
   JOIN games ON gp.game_id = games.id
   JOIN platforms ON gp.platform_id = platforms.id
   WHERE gp.id = $1;`,
    [id]
  );
  const { rows, rowCount } = result;
  return { rows, rowCount };
}

export async function deleteRelation(id: number) {
  await db.query(`DELETE FROM game_platform WHERE id = $1;`, [id]);
  return;
}

export async function listByGames(name: string) {
  const result = await db.query<RequestListing>(
    `
  SELECT 
  gp.id AS id,
  games.name AS game, 
  platforms.name AS platform 
  FROM games 
  JOIN game_platform gp ON games.id = gp.game_id
  JOIN platforms ON gp.platform_id = platforms.id
  WHERE games.name ILIKE $1;
  `,
    [`%${name}%`]
  );
  const { rows, rowCount } = result;
  return { rows, rowCount };
}

export async function editRelation(id: number, platformId: number) {
  const result = await db.query(
    `UPDATE game_platform SET platform_id = $2 WHERE id = $1;`,
    [id, platformId]
  );
  const { rows, rowCount } = result;
  return { rows, rowCount };
}
