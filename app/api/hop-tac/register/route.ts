import { partnerInquiriesTableSql, withDb } from "../../../../db";
import { partnerInquiries } from "../../../../db/schema";
import { notifyNewPartnerInquiry, notifyPartnerApplicant } from "./notify";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const cause = error instanceof Error && error.cause instanceof Error ? error.cause : undefined;
  const causeMessage = cause?.message ?? "";
  const combined = `${message}\n${causeMessage}`;

  if (combined.includes("Postgres connection env vars are missing")) {
    return "Chưa cấu hình kết nối Postgres. Kiểm tra DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD trong .dev.vars.";
  }

  if (
    combined.includes("ECONNREFUSED") ||
    combined.includes("Connection terminated") ||
    combined.includes("timeout")
  ) {
    return "Không kết nối được tới Postgres. Kiểm tra Postgres đã chạy và chấp nhận kết nối chưa.";
  }

  return causeMessage || message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      companyName?: string;
      contactName?: string;
      phone?: string;
      email?: string;
      productIndustry?: string;
      note?: string;
    };

    const companyName = payload.companyName?.trim() ?? "";
    const contactName = payload.contactName?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const productIndustry = payload.productIndustry?.trim() ?? "";
    const note = payload.note?.trim() ?? "";

    if (!companyName) {
      return Response.json({ error: "Vui lòng nhập tên doanh nghiệp / nhà máy." }, { status: 400 });
    }
    if (!phone) {
      return Response.json({ error: "Vui lòng nhập số điện thoại." }, { status: 400 });
    }

    const inquiry = await withDb(async ({ db, sql }) => {
      await sql.unsafe(partnerInquiriesTableSql);
      const [row] = await db
        .insert(partnerInquiries)
        .values({ companyName, contactName, phone, email, productIndustry, note })
        .returning();
      return row;
    });

    const inquiryDetails = { companyName, contactName, phone, email, productIndustry, note };

    try {
      await notifyNewPartnerInquiry(inquiryDetails);
    } catch (error) {
      console.error("Không thể gửi email thông báo đăng ký hợp tác:", error);
    }

    try {
      await notifyPartnerApplicant(inquiryDetails);
    } catch (error) {
      console.error("Không thể gửi email xác nhận cho nhà máy đăng ký:", error);
    }

    return Response.json({ inquiry }, { status: 201 });
  } catch (error) {
    console.error("Đăng ký hợp tác thất bại:", error);
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
