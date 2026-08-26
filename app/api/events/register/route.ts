import { getDb } from "../../../../db";
import { eventRegistrations } from "../../../../db/schema";
import { getEventBySlug } from "../../../events/data";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "event_registrations"')) {
    return "Bảng đăng ký sự kiện chưa sẵn sàng. Vui lòng chạy `npm run db:generate` rồi triển khai lại để khởi tạo cơ sở dữ liệu.";
  }

  return message;
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

    if (!eventSlug || !getEventBySlug(eventSlug)) {
      return Response.json({ error: "Sự kiện không hợp lệ." }, { status: 400 });
    }
    if (!fullName) {
      return Response.json({ error: "Vui lòng nhập họ và tên." }, { status: 400 });
    }
    if (!phone) {
      return Response.json({ error: "Vui lòng nhập số điện thoại." }, { status: 400 });
    }

    const db = getDb();
    const [registration] = await db
      .insert(eventRegistrations)
      .values({ eventSlug, fullName, phone, email, company, role, note })
      .returning();

    return Response.json({ registration }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
