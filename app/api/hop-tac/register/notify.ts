const NOTIFY_TO = ["tranthuthao9bsoncam1@gmail.com", "phuc189@gmail.com"];
const FROM_ADDRESS = "Vproud Events <noreply@mcv.network>";

type Inquiry = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  productIndustry: string;
  note: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(options: { to: string | string[]; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY chưa được cấu hình - bỏ qua gửi email.");
    return;
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
  }
}

export async function notifyNewPartnerInquiry(inquiry: Inquiry) {
  const rows: Array<[string, string]> = [
    ["Tên doanh nghiệp / Nhà máy", inquiry.companyName],
    ["Người liên hệ", inquiry.contactName || "(không cung cấp)"],
    ["Số điện thoại", inquiry.phone],
    ["Email", inquiry.email || "(không cung cấp)"],
    ["Ngành hàng / Sản phẩm", inquiry.productIndustry || "(không cung cấp)"],
    ["Ghi chú", inquiry.note || "(không có)"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <h2 style="color: #8e1010;">Có nhà máy mới đăng ký hợp tác cùng MCV</h2>
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
    subject: `Đăng ký hợp tác mới: ${inquiry.companyName}`,
    html,
  });
}

export async function notifyPartnerApplicant(inquiry: Inquiry) {
  if (!inquiry.email) return;

  const rows: Array<[string, string]> = [
    ["Tên doanh nghiệp / Nhà máy", inquiry.companyName],
    ["Người liên hệ", inquiry.contactName || "(không cung cấp)"],
    ["Số điện thoại", inquiry.phone],
    ["Email", inquiry.email || "(không cung cấp)"],
    ["Ngành hàng / Sản phẩm", inquiry.productIndustry || "(không cung cấp)"],
    ["Ghi chú", inquiry.note || "(không có)"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #211513;">
      <h2 style="color: #8e1010;">Cảm ơn ${escapeHtml(inquiry.contactName || inquiry.companyName)} đã quan tâm hợp tác cùng MCV!</h2>
      <p>
        Chúng tôi đã nhận được thông tin hợp tác của bạn. Đội ngũ MCV sẽ
        liên hệ với bạn qua số điện thoại (${escapeHtml(inquiry.phone)}) hoặc
        email này trong thời gian sớm nhất để trao đổi chi tiết mô hình hợp
        tác và các bước triển khai tiếp theo.
      </p>
      <h3 style="color: #8e1010; margin-top: 20px;">Thông tin bạn đã gửi</h3>
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
    to: inquiry.email,
    subject: "Đã ghi nhận đăng ký hợp tác cùng MCV",
    html,
  });
}
