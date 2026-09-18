import type {
  AssessmentCategoryScore,
  AssessmentFieldEntry,
  AssessmentRecommendation,
  AssessmentScoredEntry,
} from "../../../../db/schema";

type RecommendationInput = {
  companyName: string;
  branch: string;
  totalScore: number;
  levelLabel: string;
  levelDesc: string;
  categoryScores: AssessmentCategoryScore[];
  scoredEntries: AssessmentScoredEntry[];
  businessEntries: AssessmentFieldEntry[];
  supportEntries: AssessmentFieldEntry[];
};

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";
// Observed real-world latency for a full JSON recommendation can run 15-30s,
// so the cutoff needs real headroom above that rather than a "reasonable-looking" number.
const REQUEST_TIMEOUT_MS = 55000;
const MAX_ITEMS = 6;

function buildPrompt(input: RecommendationInput) {
  // Only the low-scoring answers matter for "how to complete this criterion" advice —
  // sending every question would waste tokens without adding signal.
  const weakEntries = input.scoredEntries.filter((entry) => entry.points < 5);

  const context = {
    doanh_nghiep: input.companyName || "(chưa rõ tên)",
    nhanh_danh_gia: input.branch === "branch1" ? "Chưa từng xuất khẩu" : "Đã/đang xuất khẩu",
    tong_diem: `${input.totalScore}/100`,
    muc_do_san_sang: input.levelLabel,
    mo_ta_muc_do: input.levelDesc,
    diem_theo_tieu_chi: input.categoryScores.map((c) => `${c.category}: ${c.score}/${c.max}`),
    cau_hoi_dang_bi_diem_thap: weakEntries.map((e) => ({
      tieu_chi: e.category,
      cau_hoi: e.question,
      da_chon: e.selected,
      diem: e.points,
    })),
    nhu_cau_ho_tro: input.supportEntries.map((e) => `${e.label}: ${e.value || "—"}`),
  };

  const system = [
    "Bạn là chuyên gia thực chiến về xuất khẩu cho doanh nghiệp SME tại Việt Nam.",
    "Nhiệm vụ của bạn là đưa ra nhận xét cực kỳ ngắn gọn, trực diện và mang lại giá trị hành động cao nhất dựa trên kết quả đánh giá (chú trọng các câu hỏi điểm thấp).",
    "Chỉ trả lời bằng một khối JSON hợp lệ duy nhất, đúng schema sau, tuyệt đối không dùng markdown code fence hay thêm text phụ:",
    '{"summary": string, "items": [{"category": string, "advice": string}]}',
    '"summary": 1-2 câu nhận xét thẳng thắn, súc tích về vị thế năng lực hiện tại và điểm then chốt cần đột phá.',
    `"items": liệt kê tối đa ${MAX_ITEMS} tiêu chí cấp bách nhất cần cải thiện, "category" phải khớp chính xác tên tiêu chí trong dữ liệu.`,
    '"advice": 1-2 câu hành động cụ thể. KHÔNG khuyên lý thuyết chung chung. ĐẶC BIỆT: Với các vấn đề chuyên sâu, phức tạp và khó tự triển khai, hãy khéo léo gợi ý việc tìm kiếm chuyên gia đồng hành/tư vấn bên ngoài như một hướng giải quyết thiết thực. Lời khuyên cần tự nhiên, khách quan, chân thành như một lời chia sẻ, tuyệt đối không dùng văn phong chèo kéo, quảng cáo hay sales.',
    "Nếu doanh nghiệp đã đạt điểm cao ở hầu hết các mặt, hãy gợi ý chiến lược ngách hoặc tối ưu nâng cao thay vì để trống.",
  ].join(" ");

  const user = `Dữ liệu đánh giá (JSON):\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

function extractJsonBlock(text: string) {
  const trimmed = text.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return trimmed;
  return trimmed.slice(start, end + 1);
}

function isValidRecommendation(value: unknown): value is AssessmentRecommendation {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.summary !== "string") return false;
  if (!Array.isArray(candidate.items)) return false;
  return candidate.items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as Record<string, unknown>).category === "string" &&
      typeof (item as Record<string, unknown>).advice === "string",
  );
}

export async function generateAssessmentRecommendation(
  input: RecommendationInput,
): Promise<AssessmentRecommendation | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("ANTHROPIC_API_KEY chưa được cấu hình - bỏ qua tạo khuyến nghị AI.");
    return null;
  }

  const { system, user } = buildPrompt(input);
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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
        max_tokens: 2048,
        system,
        messages: [{ role: "user", content: user }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`Gọi Anthropic API thất bại (${response.status}):`, detail);
      return null;
    }

    const data = (await response.json()) as {
      content?: { type: string; text?: string }[];
      stop_reason?: string;
    };
    const text = data.content?.find((block) => block.type === "text")?.text ?? "";
    if (!text) return null;

    if (data.stop_reason === "max_tokens") {
      console.error("Phản hồi khuyến nghị AI bị cắt do vượt max_tokens:", text);
      return null;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJsonBlock(text));
    } catch (error) {
      console.error("Không đọc được JSON khuyến nghị AI:", error, "\nNội dung nhận được:", text);
      return null;
    }

    if (!isValidRecommendation(parsed)) {
      console.error("Phản hồi khuyến nghị AI không đúng định dạng:", text);
      return null;
    }

    return { summary: parsed.summary, items: parsed.items.slice(0, MAX_ITEMS) };
  } catch (error) {
    console.error("Không thể tạo khuyến nghị AI:", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
