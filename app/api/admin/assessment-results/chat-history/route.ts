import { cookies } from "next/headers";
import {
  assessmentChatMessagesTableSql,
  assessmentChatSessionsTableSql,
  withDb,
} from "../../../../../db";
import {
  assessmentChatMessages,
  assessmentChatSessions,
} from "../../../../../db/schema";
import { ADMIN_COOKIE, hashAdminPassword } from "../../../../quan-tri/auth";
import { eq } from "drizzle-orm";

async function isAuthenticated() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = await hashAdminPassword(adminPassword);
  return token === expected;
}

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const url = new URL(request.url);
  const reportToken = url.searchParams.get("reportToken") ?? "";
  if (!reportToken) {
    return Response.json({ error: "Thiếu reportToken." }, { status: 400 });
  }

  try {
    const messages = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentChatSessionsTableSql);
      await sql.unsafe(assessmentChatMessagesTableSql);

      const [session] = await db
        .select()
        .from(assessmentChatSessions)
        .where(eq(assessmentChatSessions.reportToken, reportToken))
        .limit(1);

      if (!session) return [];

      return db
        .select()
        .from(assessmentChatMessages)
        .where(eq(assessmentChatMessages.sessionId, session.id))
        .orderBy(assessmentChatMessages.createdAt);
    });

    return Response.json({ messages });
  } catch (error) {
    console.error("Lỗi tải chat history admin:", error);
    return Response.json({ error: "Lỗi tải chat history." }, { status: 500 });
  }
}
