import {
  assessmentChatMessagesTableSql,
  assessmentChatSessionsTableSql,
  withDb,
} from "../../../../db";
import {
  assessmentChatMessages,
  assessmentChatSessions,
  assessmentResults,
} from "../../../../db/schema";
import { readToken } from "../otp/token";
import { eq } from "drizzle-orm";

type VerifiedOtpPayload = { email: string; exp: number; purpose: "otp-verified" };

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";
const REQUEST_TIMEOUT_MS = 55000;
// Keeps AI usage cost bounded per report. Mirrored client-side in assessment-chat.tsx
// for immediate UI feedback, but this is the authoritative limit.
const MAX_USER_TURNS = 3;

function buildSystemPrompt(result: {
  companyName: string;
  branch: string;
  totalScore: number;
  levelLabel: string;
  categoryScores: { category: string; score: number; max: number }[];
  aiRecommendation: {
    levelLabel?: string;
    levelDesc?: string;
    summary: string;
    items: { category: string; advice: string }[];
  } | null;
}): string {
  const branchLabel = result.branch === "branch1" ? "Chưa từng xuất khẩu" : "Đã/đang xuất khẩu";
  const categoryLines = result.categoryScores
    .map((c) => `- ${c.category}: ${c.score}/${c.max} điểm`)
    .join("\n");

  // Prefer AI-generated label/desc over the static computed ones
  const levelLabel = result.aiRecommendation?.levelLabel ?? result.levelLabel;
  const levelDesc = result.aiRecommendation?.levelDesc ?? "";

  const recommendationBlock = result.aiRecommendation
    ? [
        `Tổng quan: ${result.aiRecommendation.summary}`,
        result.aiRecommendation.items
          .map((item) => `- ${item.category}: ${item.advice}`)
          .join("\n"),
      ].join("\n")
    : "(chưa có khuyến nghị)";

  return [
    "Bạn tên là Bảo Hân, chuyên gia tư vấn xuất khẩu thực chiến cho doanh nghiệp SME Việt Nam.",
    "Bạn đang tư vấn trực tiếp cho doanh nghiệp dựa trên kết quả bài đánh giá mức độ sẵn sàng xuất khẩu của họ.",
    "",
    "QUY TRÌNH SUY LUẬN (âm thầm thực hiện trước khi trả lời, KHÔNG in các bước này ra):",
    "1) Xác định chính xác doanh nghiệp đang hỏi về vấn đề/tiêu chí gì — nếu câu hỏi mơ hồ, chọn cách diễn giải sát nhất với dữ liệu đánh giá của họ, không đoán lan man.",
    "2) Đối chiếu với đúng dữ liệu điểm số, tiêu chí yếu, và khuyến nghị AI bên dưới để xác định nguyên nhân gốc rễ — chỉ suy luận dựa trên dữ liệu được cung cấp, KHÔNG suy diễn hay bịa thêm chi tiết không có.",
    "3) Kiểm tra lại mọi con số, tên chứng nhận, quy trình trước khi trích dẫn — nếu không chắc chắn về một chi tiết cụ thể (ví dụ mã HS, chi phí, thời gian xử lý hồ sơ), nói rõ đó là ước tính tham khảo thay vì khẳng định như sự thật tuyệt đối.",
    "4) Chọn ra 2-3 hành động ưu tiên nhất thực sự giải quyết đúng nguyên nhân đó, sắp xếp theo thứ tự nên làm trước — không liệt kê dàn trải chung chung.",
    "",
    "YÊU CẦU CÂU TRẢ LỜI:",
    "Doanh nghiệp chỉ có tối đa 3 lượt hỏi trong phiên này, nên mỗi câu trả lời phải thật sự đáng giá và đi thẳng vào trọng tâm — không mở đầu dài dòng, không lặp lại nguyên văn câu hỏi, không thêm ý ngoài lề không liên quan.",
    "Luôn trả lời bằng tiếng Việt, giọng điệu tự tin, gần gũi như một chuyên gia đồng hành thực sự — không máy móc, không sáo rỗng.",
    "Định dạng rõ ràng: dùng gạch đầu dòng khi có từ 2 ý trở lên; dùng **in đậm** cho tên chứng nhận, quy trình, hoặc hành động cụ thể cần làm.",
    "Luôn gắn câu trả lời với dữ liệu thực tế của doanh nghiệp này (điểm số, tiêu chí yếu, khuyến nghị đã có) thay vì trả lời chung chung như một bài viết mẫu.",
    "Nếu câu hỏi liên quan đến điểm yếu cụ thể, hãy nêu rõ: cần làm gì, chứng nhận/quy trình nào, và đơn vị hoặc kênh nào có thể hỗ trợ.",
    "Nếu dữ liệu hiện có không đủ để trả lời chính xác, hãy nói thẳng điều đó thay vì đoán mò.",
    "Nếu vấn đề vượt ngoài phạm vi tư vấn qua chat (cần hồ sơ cụ thể, pháp lý phức tạp...), hãy nói rõ giới hạn đó và gợi ý liên hệ đội ngũ chuyên gia để được hỗ trợ sâu hơn — không cố trả lời qua loa.",
    "KHÔNG bịa thông tin, KHÔNG lý thuyết chung chung, KHÔNG lặp lại nguyên văn câu hỏi của người dùng.",
    "Nếu phù hợp, kết thúc bằng một gợi ý hành động tiếp theo cụ thể.",
    "",
    "--- KẾT QUẢ ĐÁNH GIÁ CỦA DOANH NGHIỆP ---",
    `Doanh nghiệp: ${result.companyName || "(chưa rõ tên)"}`,
    `Loại hình: ${branchLabel}`,
    `Tổng điểm: ${result.totalScore}/100 — Mức độ: ${levelLabel}`,
    levelDesc ? `Nhận xét: ${levelDesc}` : "",
    "",
    "Điểm theo tiêu chí:",
    categoryLines,
    "",
    "Khuyến nghị AI đã đưa ra:",
    recommendationBlock,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request: Request) {
  const otpSecret = process.env.OTP_SECRET;
  const otpToken = request.headers.get("x-otp-token") ?? "";
  const verified = otpSecret ? await readToken<VerifiedOtpPayload>(otpToken, otpSecret) : null;
  if (!verified || verified.purpose !== "otp-verified" || Date.now() > verified.exp) {
    return Response.json({ error: "Vui lòng xác nhận email trước khi chat." }, { status: 401 });
  }
  const email = verified.email;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chức năng chat chưa được cấu hình." }, { status: 503 });
  }

  let body: { reportToken?: string; message?: string };
  try {
    body = (await request.json()) as { reportToken?: string; message?: string };
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { reportToken, message } = body;
  if (!reportToken || !message?.trim()) {
    return Response.json({ error: "Thiếu reportToken hoặc nội dung tin nhắn." }, { status: 400 });
  }
  const userMessage = message.trim();

  try {
    const { systemPrompt, sessionId, history } = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentChatSessionsTableSql);
      await sql.unsafe(assessmentChatMessagesTableSql);

      const [result] = await db
        .select()
        .from(assessmentResults)
        .where(eq(assessmentResults.reportToken, reportToken))
        .limit(1);

      if (!result) {
        throw Object.assign(new Error("Báo cáo không tồn tại."), { status: 404 });
      }
      if (result.email.toLowerCase() !== email.toLowerCase()) {
        throw Object.assign(new Error("Bạn không có quyền truy cập báo cáo này."), { status: 403 });
      }

      let [session] = await db
        .select()
        .from(assessmentChatSessions)
        .where(eq(assessmentChatSessions.reportToken, reportToken))
        .limit(1);

      if (!session) {
        const inserted = await db
          .insert(assessmentChatSessions)
          .values({ reportToken, email })
          .onConflictDoNothing({ target: assessmentChatSessions.reportToken })
          .returning();
        session = inserted[0];
        if (!session) {
          // Lost the race to a concurrent request that inserted first — reuse its row.
          [session] = await db
            .select()
            .from(assessmentChatSessions)
            .where(eq(assessmentChatSessions.reportToken, reportToken))
            .limit(1);
        }
      }

      const messages = await db
        .select()
        .from(assessmentChatMessages)
        .where(eq(assessmentChatMessages.sessionId, session.id))
        .orderBy(assessmentChatMessages.createdAt);

      const userTurnCount = messages.filter((m) => m.role === "user").length;
      if (userTurnCount >= MAX_USER_TURNS) {
        throw Object.assign(
          new Error(`Bạn đã dùng hết ${MAX_USER_TURNS} lượt hỏi cho bài đánh giá này.`),
          { status: 403 },
        );
      }

      const sysPrompt = buildSystemPrompt({
        companyName: result.companyName,
        branch: result.branch,
        totalScore: result.totalScore,
        levelLabel: result.levelLabel,
        categoryScores: result.categoryScores as { category: string; score: number; max: number }[],
        aiRecommendation: result.aiRecommendation as {
          summary: string;
          items: { category: string; advice: string }[];
        } | null,
      });

      return { systemPrompt: sysPrompt, sessionId: session.id, history: messages };
    });

    const anthropicMessages = [
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: userMessage },
    ];

    const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let assistantReply = "";
    try {
      const response = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          system: systemPrompt,
          messages: anthropicMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error(`Anthropic API lỗi (${response.status}):`, detail);
        return Response.json({ error: "Không thể kết nối AI, vui lòng thử lại." }, { status: 502 });
      }

      const data = (await response.json()) as {
        content?: { type: string; text?: string }[];
      };
      assistantReply = data.content?.find((b) => b.type === "text")?.text ?? "";
    } finally {
      clearTimeout(timeout);
    }

    if (!assistantReply) {
      return Response.json({ error: "AI không trả lời được, vui lòng thử lại." }, { status: 502 });
    }

    // Persisted synchronously, before the response is returned — on Cloudflare Workers the
    // isolate can be torn down right after the response is sent, so a write deferred past
    // that point can get silently dropped. Awaiting it here guarantees it's saved.
    await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentChatMessagesTableSql);
      await db.insert(assessmentChatMessages).values([
        { sessionId, role: "user", content: userMessage },
        { sessionId, role: "assistant", content: assistantReply },
      ]);
    });

    return Response.json({ reply: assistantReply });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    const status = err.status ?? 500;
    console.error("Chat error:", error);
    return Response.json({ error: err.message ?? "Lỗi không xác định." }, { status });
  }
}
