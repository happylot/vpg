import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

function createClient() {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const database = process.env.DB_DATABASE;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (!host || !database || !username || !password) {
    throw new Error(
      "Postgres connection env vars are missing. Set DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME and DB_PASSWORD (see .dev.vars.example)."
    );
  }

  return postgres({
    host,
    port: port ? Number(port) : 5432,
    database,
    username,
    password,
    ssl: false,
    max: 1,
  });
}

// Cloudflare Workers forbids reusing an I/O object (like an open Postgres
// socket) across requests - each request gets its own isolated context. So
// unlike a typical Node server, we cannot cache a shared client at module
// scope. Instead, open a fresh connection per call and always close it
// before returning, all within the same request.
export async function withDb<T>(
  run: (ctx: {
    db: ReturnType<typeof drizzle<typeof schema>>;
    sql: ReturnType<typeof postgres>;
  }) => Promise<T>
): Promise<T> {
  const client = createClient();
  try {
    const db = drizzle(client, { schema });
    return await run({ db, sql: client });
  } finally {
    await client.end({ timeout: 5 });
  }
}

export const eventRegistrationsTableSql = `
  CREATE TABLE IF NOT EXISTS event_registrations (
    id serial PRIMARY KEY,
    event_slug text NOT NULL,
    full_name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL DEFAULT '',
    company text NOT NULL DEFAULT '',
    role text NOT NULL DEFAULT '',
    note text NOT NULL DEFAULT '',
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  )
`;

// Adds columns introduced after the table already existed in production
// (e.g. the 17 test rows created before `is_read` existed).
export const eventRegistrationsAlterSql = `
  ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false
`;
