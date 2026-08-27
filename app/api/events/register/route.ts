import { eventRegistrationsTableSql, withDb } from "../../../../db";
import { eventRegistrations } from "../../../../db/schema";
import { getEventBySlug } from "../../../events/data";
import { notifyNewRegistration, notifyRegistrant } from "./notify";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const cause =
    error instanceof Error && error.cause instanceof Error ? error.cause : undefined;
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

  // Surface the underlying Postgres reason (e.g. missing column, permission
  // denied) instead of the generic "Failed query: ..." wrapper message.
  return causeMessage || message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      eventSlug?: string;
      fullName?: string;
      phone?: string;
      email?: string;
      company?: string;
      role?: string;
      note?: string;
    };

    const eventSlug = payload.eventSlug?.trim() ?? "";
    const fullName = payload.fullName?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const company = payload.company?.trim() ?? "";
    const role = payload.role?.trim() ?? "";
    const note = payload.note?.trim() ?? "";

    const event = getEventBySlug(eventSlug);
    if (!eventSlug || !event) {
      return Response.json({ error: "Sự kiện không hợp lệ." }, { status: 400 });
    }
    if (!fullName) {
      return Response.json({ error: "Vui lòng nhập họ và tên." }, { status: 400 });
    }
    if (!phone) {
      return Response.json({ error: "Vui lòng nhập số điện thoại." }, { status: 400 });
    }

    const registration = await withDb(async ({ db, sql }) => {
      await sql.unsafe(eventRegistrationsTableSql);
      const [row] = await db
        .insert(eventRegistrations)
        .values({ eventSlug, fullName, phone, email, company, role, note })
        .returning();
      return row;
    });

    const registrationDetails = { fullName, phone, email, company, role, note };

    try {
      await notifyNewRegistration(event, registrationDetails);
    } catch (error) {
      console.error("Không thể gửi email thông báo đăng ký:", error);
    }

    try {
      await notifyRegistrant(event, registrationDetails);
    } catch (error) {
      console.error("Không thể gửi email xác nhận cho người đăng ký:", error);
    }

    return Response.json({ registration }, { status: 201 });
  } catch (error) {
    console.error("Đăng ký sự kiện thất bại:", error);
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
