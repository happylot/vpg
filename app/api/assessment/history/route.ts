import {
  assessmentResultsAlterSql,
  assessmentResultsEmailIndexSql,
  assessmentResultsTableSql,
  withDb,
} from "../../../../db";
import { assessmentResults } from "../../../../db/schema";
import { readToken } from "../otp/token";
import { desc, sql } from "drizzle-orm";

type VerifiedOtpPayload = { email: string; exp: number; purpose: "otp-verified" };

export async function GET(request: Request) {
  const otpSecret = process.env.OTP_SECRET;
  const otpToken = request.headers.get("x-otp-token") ?? "";
  const verified = otpSecret ? await readToken<VerifiedOtpPayload>(otpToken, otpSecret) : null;
  if (!verified || verified.purpose !== "otp-verified" || Date.now() > verified.exp) {
    return Response.json({ error: "Xác thực thất bại." }, { status: 401 });
  }
  const email = verified.email.toLowerCase();

  try {
    const reports = await withDb(async ({ db, sql: rawSql }) => {
      await rawSql.unsafe(assessmentResultsTableSql);
      await rawSql.unsafe(assessmentResultsAlterSql);
      await rawSql.unsafe(assessmentResultsEmailIndexSql);

      return db
        .select({
          reportToken: assessmentResults.reportToken,
          companyName: assessmentResults.companyName,
          totalScore: assessmentResults.totalScore,
          levelLabel: assessmentResults.levelLabel,
          createdAt: assessmentResults.createdAt,
        })
        .from(assessmentResults)
        .where(sql`lower(${assessmentResults.email}) = ${email}`)
        .orderBy(desc(assessmentResults.createdAt));
    });

    return Response.json({ reports });
  } catch (error) {
    console.error("Không tải được lịch sử đánh giá:", error);
    return Response.json({ error: "Lỗi tải lịch sử đánh giá." }, { status: 500 });
  }
}
