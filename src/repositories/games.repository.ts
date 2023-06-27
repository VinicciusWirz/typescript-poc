import { db } from "../database/database.connection";

export function listGames() {
  const result = db.query(`SELECT * FROM games`);
  return result;
}
export function createGame() {
  const result = db.query(`SELECT * FROM games`);
  return result;
}
