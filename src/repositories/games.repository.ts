import { db } from "../database/database.connection";

export function listGames(game: string, platform: string) {
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

  const result = db.query(query, params);

  return result;
}
export function createGame(game: string, platformId: number) {
  const query: string = `WITH new_game AS (
    INSERT INTO games (name) 
    VALUES ($1) 
    RETURNING id
  )
  INSERT INTO game_platform (game_id, platform_id)
  SELECT new_game.id, $2
  FROM new_game;`;
  const params: any[] = [game, platformId];
  const result = db.query(query, params);
  return result;
}

export function findGameByName(game: string) {
  const result = db.query(
    `SELECT id FROM games 
      WHERE name = $1;`,
    [game]
  );
  return result;
}

export function createGameById(gameId: number, platformId: number) {
  const result = db.query(
    `INSERT INTO game_platform (game_id, platform_id) VALUES ($1, $2);`,
    [gameId, platformId]
  );
  return result;
}

export function findRelation(id: number) {
  const result = db.query(
    `SELECT gp.*, games.name AS game, platforms.name AS platform
   FROM game_platform gp
   JOIN games ON gp.game_id = games.id
   JOIN platforms ON gp.platform_id = platforms.id
   WHERE gp.id = $1;`,
    [id]
  );
  return result;
}

export function deleteRelation(id: number) {
  const result = db.query(`DELETE FROM game_platform WHERE id = $1;`, [id]);
  return result;
}

export function listByGames(name: string) {
  const result = db.query(
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
  return result;
}

export function editRelation(id: number, platformId: number) {
  const result = db.query(
    `UPDATE game_platform SET platform_id = $2 WHERE id = $1;`,
    [id, platformId]
  );
  return result;
}
