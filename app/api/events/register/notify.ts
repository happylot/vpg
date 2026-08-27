import type { VpgEvent } from "../../../events/data";

const NOTIFY_TO = "tranthuthao9bsoncam1@gmail.com";
const FROM_ADDRESS = "Vproud Events <onboarding@resend.dev>";

type Registration = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  note: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(options: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY chưa được cấu hình - bỏ qua gửi email.",
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [options.to],
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`Gửi email tới ${options.to} thất bại:`, detail);
  }
}

export async function notifyNewRegistration(
  event: VpgEvent,
  registration: Registration,
) {
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

  await sendEmail({
    to: NOTIFY_TO,
    subject: `Đăng ký mới: ${event.title}`,
    html,
  });
}

export async function notifyRegistrant(
  event: VpgEvent,
  registration: Registration,
) {
  if (!registration.email) return;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <h2 style="color: #8e1010;">Cảm ơn ${escapeHtml(registration.fullName)} đã đăng ký!</h2>
      <p>Bạn đã đăng ký tham gia sự kiện sau của Vproud:</p>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; vertical-align: top; padding-right: 12px;">Sự kiện</td>
          <td>${escapeHtml(event.title)}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; vertical-align: top; padding-right: 12px;">Thời gian</td>
          <td>${escapeHtml(`${event.dateLabel} · ${event.timeLabel}`)}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; vertical-align: top; padding-right: 12px;">Địa điểm</td>
          <td>${escapeHtml(event.venue)}</td>
        </tr>
      </table>
      <p style="margin-top: 16px;">
        Ban tổ chức Vproud sẽ liên hệ xác nhận với bạn qua số điện thoại
        (${escapeHtml(registration.phone)}) hoặc email này trước ngày diễn ra
        sự kiện.
      </p>
    </div>
  `;

  await sendEmail({
    to: registration.email,
    subject: `Đã ghi nhận đăng ký: ${event.title}`,
    html,
  });
}
