import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | undefined;
let schemaEnsured = false;

function getClient() {
  if (client) return client;

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

  client = postgres({
    host,
    port: port ? Number(port) : 5432,
    database,
    username,
    password,
    ssl: false,
  });

  return client;
}

export function getDb() {
  return drizzle(getClient(), { schema });
}

// Idempotent bootstrap so local/dev environments work without a separate
// manual migration step. Production should still apply `drizzle/*.sql`
// through a real migration run when possible.
export async function ensureSchema() {
  if (schemaEnsured) return;

  await getClient()`
    CREATE TABLE IF NOT EXISTS event_registrations (
      id serial PRIMARY KEY,
      event_slug text NOT NULL,
      full_name text NOT NULL,
      phone text NOT NULL,
      email text NOT NULL DEFAULT '',
      company text NOT NULL DEFAULT '',
      role text NOT NULL DEFAULT '',
      note text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  schemaEnsured = true;
}
