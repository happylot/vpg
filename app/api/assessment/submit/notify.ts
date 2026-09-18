const NOTIFY_TO = ["tranthuthao9bsoncam1@gmail.com", "phuc189@gmail.com"];
const FROM_ADDRESS = "Vproud Events <noreply@mcv.network>";

type ScoredEntry = { category: string; question: string; selected: string; points: number };
type CategoryScore = { category: string; max: number; score: number };
type FieldEntry = { label: string; value: string };

type AssessmentResultDetails = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  branch: string;
  totalScore: number;
  levelLabel: string;
  levelDesc: string;
  businessEntries: FieldEntry[];
  profileEntries: FieldEntry[] | null;
  scoredEntries: ScoredEntry[];
  categoryScores: CategoryScore[];
  supportEntries: FieldEntry[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEmail(options: { to: string | string[]; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY chưa được cấu hình - bỏ qua gửi email.");
    throw new Error("RESEND_API_KEY chưa được cấu hình.");
  }

  const to = Array.isArray(options.to) ? options.to : [options.to];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`Gửi email tới ${to.join(", ")} thất bại:`, detail);
    throw new Error(`Gửi email thất bại: ${detail}`);
  }
}

export async function sendOtpEmail(email: string, otp: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <p>Mã xác nhận của bạn để bắt đầu bài đánh giá sẵn sàng xuất khẩu cùng Vproud:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #8e1010;">${otp}</p>
      <p style="color: #55423d;">Mã có hiệu lực trong 10 phút. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: `Mã xác nhận đánh giá sẵn sàng xuất khẩu: ${otp}`,
    html,
  });
}

function renderFieldEntries(entries: [string, string][]) {
  return entries
    .map(
      ([label, value]) => `
        <tr>
          <td style="font-weight: bold; vertical-align: top; padding: 4px 12px 4px 0;">${escapeHtml(label)}</td>
          <td style="padding: 4px 0;">${escapeHtml(value || "—")}</td>
        </tr>`,
    )
    .join("");
}

function renderCategoryScores(categoryScores: CategoryScore[]) {
  return categoryScores
    .map(
      (c) => `
        <tr>
          <td style="padding: 6px 12px 6px 0;">${escapeHtml(c.category)}</td>
          <td style="padding: 6px 0; font-weight: bold; color: #8e1010;">${c.score}/${c.max}</td>
        </tr>`,
    )
    .join("");
}

function renderScoredEntries(scoredEntries: ScoredEntry[]) {
  const groups: { category: string; entries: ScoredEntry[] }[] = [];
  for (const entry of scoredEntries) {
    let group = groups.find((g) => g.category === entry.category);
    if (!group) {
      group = { category: entry.category, entries: [] };
      groups.push(group);
    }
    group.entries.push(entry);
  }

  return groups
    .map(
      (group) => `
        <h4 style="margin: 16px 0 6px; color: #211513;">${escapeHtml(group.category)}</h4>
        ${group.entries
          .map(
            (entry) => `
          <p style="margin: 0 0 8px; line-height: 1.5;">
            <strong>${escapeHtml(entry.question)}</strong><br />
            ${escapeHtml(entry.selected)} <span style="color: #8e1010; font-weight: bold;">(${entry.points} điểm)</span>
          </p>`,
          )
          .join("")}`,
    )
    .join("");
}

function buildResultHtml(data: AssessmentResultDetails) {
  return `
    <div style="font-family: Arial, sans-serif; color: #211513; max-width: 640px;">
      <h2 style="color: #8e1010;">Kết quả đánh giá sẵn sàng xuất khẩu</h2>
      <p style="font-size: 1.1rem;">
        <strong>${data.totalScore}/100 điểm</strong> — ${escapeHtml(data.levelLabel)}
      </p>
      <p style="color: #55423d;">${escapeHtml(data.levelDesc)}</p>

      <h3 style="color: #8e1010; margin-top: 24px;">Điểm theo từng tiêu chí</h3>
      <table cellpadding="0" style="border-collapse: collapse; width: 100%;">
        ${renderCategoryScores(data.categoryScores)}
      </table>

      <h3 style="color: #8e1010; margin-top: 24px;">A — Thông tin doanh nghiệp</h3>
      <table cellpadding="0" style="border-collapse: collapse;">
        ${renderFieldEntries(data.businessEntries.map((e) => [e.label, e.value]))}
      </table>

      ${
        data.profileEntries
          ? `<h3 style="color: #8e1010; margin-top: 24px;">Hiện trạng xuất khẩu</h3>
      <table cellpadding="0" style="border-collapse: collapse;">
        ${renderFieldEntries(data.profileEntries.map((e) => [e.label, e.value]))}
      </table>`
          : ""
      }

      <h3 style="color: #8e1010; margin-top: 24px;">B — Chi tiết từng câu hỏi</h3>
      ${renderScoredEntries(data.scoredEntries)}

      <h3 style="color: #8e1010; margin-top: 24px;">C — Nhu cầu hỗ trợ</h3>
      <table cellpadding="0" style="border-collapse: collapse;">
        ${renderFieldEntries(data.supportEntries.map((e) => [e.label, e.value]))}
      </table>
    </div>
  `;
}

export async function notifyAssessmentTaker(data: AssessmentResultDetails) {
  if (!data.email) return;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <p>Cảm ơn ${escapeHtml(data.contactName || data.companyName)} đã hoàn thành bài đánh giá mức độ sẵn sàng xuất khẩu cùng Vproud.</p>
      <p>Dưới đây là toàn bộ kết quả và các câu trả lời bạn đã điền, để bạn tiện xem lại và hiểu rõ vì sao doanh nghiệp đạt mức điểm này.</p>
    </div>
    ${buildResultHtml(data)}
  `;

  await sendEmail({
    to: data.email,
    subject: `Kết quả đánh giá sẵn sàng xuất khẩu: ${data.totalScore}/100 điểm`,
    html,
  });
}

export async function notifyAdminOfAssessment(data: AssessmentResultDetails) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <p>Có doanh nghiệp mới vừa hoàn thành bài tự đánh giá.</p>
      <table cellpadding="0" style="border-collapse: collapse; margin-bottom: 16px;">
        <tr><td style="font-weight: bold; padding-right: 12px;">Doanh nghiệp</td><td>${escapeHtml(data.companyName)}</td></tr>
        <tr><td style="font-weight: bold; padding-right: 12px;">Người liên hệ</td><td>${escapeHtml(data.contactName || "—")}</td></tr>
        <tr><td style="font-weight: bold; padding-right: 12px;">Số điện thoại</td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td style="font-weight: bold; padding-right: 12px;">Email</td><td>${escapeHtml(data.email || "—")}</td></tr>
      </table>
    </div>
    ${buildResultHtml(data)}
  `;

  await sendEmail({
    to: NOTIFY_TO,
    subject: `Đánh giá mới: ${data.companyName} — ${data.totalScore}/100 điểm`,
    html,
  });
}
