import type { VpgEvent } from "../../../events/data";

const NOTIFY_TO = "tranthuthao9bsoncam1@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifyNewRegistration(
  event: VpgEvent,
  registration: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
    role: string;
    note: string;
  },
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY chưa được cấu hình - bỏ qua gửi email thông báo đăng ký.",
    );
    return;
  }

  const rows: Array<[string, string]> = [
    ["Sự kiện", event.title],
    ["Thời gian", `${event.dateLabel} · ${event.timeLabel}`],
    ["Địa điểm", event.venue],
    ["Họ và tên", registration.fullName],
    ["Số điện thoại", registration.phone],
    ["Email", registration.email || "(không cung cấp)"],
    ["Doanh nghiệp / Tổ chức", registration.company || "(không cung cấp)"],
    ["Chức vụ", registration.role || "(không cung cấp)"],
    ["Ghi chú", registration.note || "(không có)"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <h2 style="color: #8e1010;">Có người đăng ký tham gia sự kiện mới</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: bold; vertical-align: top; padding-right: 12px;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Vproud Events <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      subject: `Đăng ký mới: ${event.title}`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Gửi email thông báo đăng ký thất bại:", detail);
  }
}
