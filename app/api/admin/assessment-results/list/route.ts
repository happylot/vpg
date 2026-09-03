import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { assessmentResultsTableSql, withDb } from "../../../../../db";
import { assessmentResults } from "../../../../../db/schema";
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

  try {
    const results = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentResultsTableSql);
      return db.select().from(assessmentResults).orderBy(desc(assessmentResults.createdAt));
    });

    return Response.json({ results });
  } catch (error) {
    console.error("Lỗi truy vấn danh sách đánh giá:", error);
    const message = error instanceof Error ? error.message : String(error);
    const cause =
      error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
    return Response.json({ error: message, cause }, { status: 500 });
  }
}
