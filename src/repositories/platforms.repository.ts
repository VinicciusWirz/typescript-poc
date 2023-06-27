import { db } from "../database/database.connection";

export function listPlatforms(platform: string) {
  let query: string = `SELECT * FROM platforms`;
  const params: string[] = [];
  if (platform) {
    query += ` WHERE name ILIKE $1`;
    params.push(platform);
  }
  query += `;`;
  const result = db.query(query, params);
  return result;
}
export function createPlatform(platform: string) {
  const result = db.query(
    `INSERT INTO platforms (name) 
  VALUES ($1);`,
    [platform]
  );
  return result;
}
