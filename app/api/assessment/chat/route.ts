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
    "Hãy trả lời ngắn gọn, thực tế, đi thẳng vào vấn đề người dùng đặt ra.",
    "Nếu câu hỏi liên quan đến điểm yếu cụ thể, hãy gợi ý hành động cụ thể (ví dụ: cần chứng nhận gì, quy trình nào, đơn vị nào hỗ trợ).",
    "Nếu vấn đề phức tạp cần chuyên gia đồng hành, hãy gợi ý tìm hỗ trợ chuyên môn một cách tự nhiên.",
    "KHÔNG bịa thông tin, KHÔNG lý thuyết chung chung.",
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

    const upstream = await fetch(ANTHROPIC_API_URL, {
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
        stream: true,
        messages: anthropicMessages,
      }),
      signal: controller.signal,
    });

    if (!upstream.ok || !upstream.body) {
      clearTimeout(timeout);
      const detail = await upstream.text().catch(() => "");
      console.error(`Anthropic API lỗi (${upstream.status}):`, detail);
      return Response.json({ error: "Không thể kết nối AI, vui lòng thử lại." }, { status: 502 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(streamController) {
        const reader = upstream.body!.getReader();
        let buffer = "";
        let assistantReply = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr) continue;
              try {
                const event = JSON.parse(jsonStr) as {
                  type?: string;
                  delta?: { type?: string; text?: string };
                };
                if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                  const textChunk = event.delta.text ?? "";
                  if (textChunk) {
                    assistantReply += textChunk;
                    streamController.enqueue(encoder.encode(textChunk));
                  }
                }
              } catch {
                // ignore malformed SSE chunk
              }
            }
          }
        } catch (streamError) {
          console.error("Lỗi khi đọc stream từ Anthropic:", streamError);
        } finally {
          clearTimeout(timeout);
          streamController.close();
        }

        if (assistantReply) {
          try {
            await withDb(async ({ db, sql }) => {
              await sql.unsafe(assessmentChatMessagesTableSql);
              await db.insert(assessmentChatMessages).values([
                { sessionId, role: "user", content: userMessage },
                { sessionId, role: "assistant", content: assistantReply },
              ]);
            });
          } catch (dbError) {
            console.error("Không thể lưu lịch sử chat:", dbError);
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    const status = err.status ?? 500;
    console.error("Chat error:", error);
    return Response.json({ error: err.message ?? "Lỗi không xác định." }, { status });
  }
}
