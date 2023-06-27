import { db } from "../database/database.connection";

export function listGames(game: string, platform: string) {
  let query: string = `
  SELECT 
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
export function createGame(game, platformId) {
  const query: string = `WITH new_game AS (
    INSERT INTO games (name) 
    VALUES ($1) 
    RETURNING id
  )
  INSERT INTO game_platform (game_id, platform_id)
  SELECT new_game.id, $2
  FROM new_game;`;
  const params: string[] = [game, platformId];
  const result = db.query(query, params);
  return result;
}
