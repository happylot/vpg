import {
  assessmentChatMessagesTableSql,
  assessmentChatSessionsTableSql,
  withDb,
} from "../../../../../db";
import {
  assessmentChatMessages,
  assessmentChatSessions,
  assessmentResults,
} from "../../../../../db/schema";
import { readToken } from "../../otp/token";
import { eq } from "drizzle-orm";

type VerifiedOtpPayload = { email: string; exp: number; purpose: "otp-verified" };

export async function GET(request: Request) {
  const otpSecret = process.env.OTP_SECRET;
  const otpToken = request.headers.get("x-otp-token") ?? "";
  const verified = otpSecret ? await readToken<VerifiedOtpPayload>(otpToken, otpSecret) : null;
  if (!verified || verified.purpose !== "otp-verified" || Date.now() > verified.exp) {
    return Response.json({ error: "Xác thực thất bại." }, { status: 401 });
  }
  const email = verified.email;

  const url = new URL(request.url);
  const reportToken = url.searchParams.get("reportToken") ?? "";
  if (!reportToken) {
    return Response.json({ error: "Thiếu reportToken." }, { status: 400 });
  }

  try {
    const messages = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentChatSessionsTableSql);
      await sql.unsafe(assessmentChatMessagesTableSql);

      // Verify ownership
      const [result] = await db
        .select({ email: assessmentResults.email })
        .from(assessmentResults)
        .where(eq(assessmentResults.reportToken, reportToken))
        .limit(1);

      if (!result || result.email.toLowerCase() !== email.toLowerCase()) {
        return null;
      }

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

    if (messages === null) {
      return Response.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    return Response.json({ messages });
  } catch (error) {
    console.error("Chat history error:", error);
    return Response.json({ error: "Lỗi tải lịch sử chat." }, { status: 500 });
  }
}
