import { db } from "../database/database.connection";

export function listPlatforms() {
  const result = db.query(`SELECT * FROM platforms`);
  return result;
}
export function createPlatform() {
  const result = db.query(`SELECT * FROM platforms`);
  return result;
}
