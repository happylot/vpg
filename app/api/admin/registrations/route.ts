import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { eventRegistrationsAlterSql, withDb } from "../../../../db";
import { eventRegistrations } from "../../../../db/schema";
import { ADMIN_COOKIE, hashAdminPassword } from "../../../quan-tri/auth";

async function isAuthenticated() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const expected = await hashAdminPassword(adminPassword);
  return token === expected;
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const payload = (await request.json()) as { id?: number; isRead?: boolean };
  const id = payload.id;
  if (!id || !Number.isInteger(id)) {
    return Response.json({ error: "Thiếu id hợp lệ." }, { status: 400 });
  }

  await withDb(async ({ db, sql }) => {
    await sql.unsafe(eventRegistrationsAlterSql);
    await db
      .update(eventRegistrations)
      .set({ isRead: payload.isRead ?? true })
      .where(eq(eventRegistrations.id, id));
  });

  return Response.json({ ok: true });
}
