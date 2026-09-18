import { assessmentResultsAlterSql, assessmentResultsTableSql, withDb } from "../../../../../db";
import { assessmentResults } from "../../../../../db/schema";
import { readToken } from "../../otp/token";
import { eq } from "drizzle-orm";

type VerifiedOtpPayload = { email: string; exp: number; purpose: "otp-verified" };

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const otpSecret = process.env.OTP_SECRET;
  const otpToken = request.headers.get("x-otp-token") ?? "";
  const verified = otpSecret ? await readToken<VerifiedOtpPayload>(otpToken, otpSecret) : null;
  if (!verified || verified.purpose !== "otp-verified" || Date.now() > verified.exp) {
    return Response.json({ error: "Xác thực thất bại." }, { status: 401 });
  }
  const email = verified.email;

  const { token: reportToken } = await params;
  if (!reportToken) {
    return Response.json({ error: "Thiếu reportToken." }, { status: 400 });
  }

  try {
    const row = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentResultsTableSql);
      await sql.unsafe(assessmentResultsAlterSql);

      const [result] = await db
        .select()
        .from(assessmentResults)
        .where(eq(assessmentResults.reportToken, reportToken))
        .limit(1);

      return result ?? null;
    });

    if (!row) {
      return Response.json({ error: "Không tìm thấy bài đánh giá." }, { status: 404 });
    }
    if (row.email.toLowerCase() !== email.toLowerCase()) {
      return Response.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    return Response.json({
      result: {
        reportToken: row.reportToken,
        companyName: row.companyName,
        totalScore: row.totalScore,
        aiRecommendation: row.aiRecommendation,
        createdAt: row.createdAt,
      },
    });
  } catch (error) {
    console.error("Không tải được bài đánh giá:", error);
    return Response.json({ error: "Lỗi tải bài đánh giá." }, { status: 500 });
  }
}
