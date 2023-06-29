import { RequestPlatform } from "protocols";
import { db } from "../database/database.connection";

export async function listPlatforms(platform: string) {
  let query: string = `SELECT * FROM platforms`;
  const params: string[] = [];
  if (platform) {
    query += ` WHERE name ILIKE $1`;
    params.push(platform);
  }
  query += `;`;
  const result = await db.query<RequestPlatform>(query, params);
  const { rows, rowCount }: { rows: RequestPlatform[]; rowCount: number } =
    result;
  return { rows, rowCount };
}
export function createPlatform(platform: string) {
  db.query<undefined>(
    `INSERT INTO platforms (name) 
  VALUES ($1);`,
    [platform]
  );
  return;
}
