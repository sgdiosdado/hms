import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import { env } from "~/env.server";
import * as schema from "./schema.server";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Database.Database | undefined;
};

const conn =
  globalForDb.conn ?? new Database(env.DATABASE_URL, { fileMustExist: false });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
