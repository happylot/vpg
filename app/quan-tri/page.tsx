import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { withDb } from "../../db";
import { eventRegistrations } from "../../db/schema";
import { events } from "../events/data";
import { ADMIN_COOKIE, hashAdminPassword } from "./auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quản trị đăng ký | Vproud",
  robots: { index: false, follow: false },
};

async function isAuthenticated() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const expected = await hashAdminPassword(adminPassword);
  return token === expected;
}

function formatDate(value: Date) {
  return value.toLocaleDateString("vi-VN", { dateStyle: "short" });
}

function formatTime(value: Date) {
  return value.toLocaleTimeString("vi-VN", { timeStyle: "medium" });
}

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <main className="admin-page">
        <LoginForm />
      </main>
    );
  }

  const registrations = await withDb(async ({ db }) =>
    db
      .select()
      .from(eventRegistrations)
      .orderBy(desc(eventRegistrations.createdAt)),
  );

  const eventTitleBySlug = new Map(
    events.map((event) => [event.slug, event.title]),
  );

  return (
    <main className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="section-label">Quản trị</p>
          <h1>Danh sách đăng ký sự kiện</h1>
          <p className="admin-page__count">
            {registrations.length} lượt đăng ký
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--dark">
            Đăng xuất
          </button>
        </form>
      </div>

      {registrations.length === 0 ? (
        <p className="admin-page__empty">Chưa có ai đăng ký sự kiện nào.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ngày đăng ký</th>
                <th>Giờ đăng ký</th>
                <th>Sự kiện</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Doanh nghiệp</th>
                <th>Chức vụ</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.createdAt)}</td>
                  <td>{formatTime(row.createdAt)}</td>
                  <td>{eventTitleBySlug.get(row.eventSlug) ?? row.eventSlug}</td>
                  <td>{row.fullName}</td>
                  <td>{row.phone}</td>
                  <td>{row.email || "—"}</td>
                  <td>{row.company || "—"}</td>
                  <td>{row.role || "—"}</td>
                  <td>{row.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
