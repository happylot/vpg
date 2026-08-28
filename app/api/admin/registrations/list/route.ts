import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import {
  eventRegistrationsAlterSql,
  eventRegistrationsTableSql,
  withDb,
} from "../../../../../db";
import { eventRegistrations } from "../../../../../db/schema";
import { ADMIN_COOKIE, hashAdminPassword } from "../../../../quan-tri/auth";

async function isAuthenticated() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const expected = await hashAdminPassword(adminPassword);
  return token === expected;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const registrations = await withDb(async ({ db, sql }) => {
    await sql.unsafe(eventRegistrationsTableSql);
    await sql.unsafe(eventRegistrationsAlterSql);
    return db
      .select()
      .from(eventRegistrations)
      .orderBy(desc(eventRegistrations.createdAt));
  });

  return Response.json({ registrations });
}
