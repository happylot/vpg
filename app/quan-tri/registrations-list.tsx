"use client";

import { useEffect, useState } from "react";
import { events } from "../events/data";

type Registration = {
  id: number;
  eventSlug: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  note: string;
  isRead: boolean;
  createdAt: string;
};

const eventTitleBySlug = new Map(
  events.map((event) => [event.slug, event.title]),
);

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("vi-VN", { timeStyle: "medium" });
}

export function RegistrationsList() {
  const [registrations, setRegistrations] = useState<Registration[] | null>(
    null,
  );
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/admin/registrations/list", {
        cache: "no-store",
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? `Lỗi HTTP ${response.status}`);
      }
      const data = (await response.json()) as {
        registrations: Registration[];
      };
      setRegistrations(data.registrations);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể tải danh sách.",
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: number, isRead: boolean) {
    setRegistrations((prev) =>
      prev ? prev.map((row) => (row.id === id ? { ...row, isRead } : row)) : prev,
    );
    try {
      await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
    } catch {
      load();
    }
  }

  if (error) {
    return <p className="admin-page__empty">{error}</p>;
  }

  if (!registrations) {
    return <p className="admin-page__empty">Đang tải danh sách...</p>;
  }

  const unreadCount = registrations.filter((row) => !row.isRead).length;

  return (
    <>
      <p className="admin-page__count">
        {registrations.length} lượt đăng ký
        {unreadCount > 0 && (
          <span className="admin-page__unread-badge">{unreadCount} chưa đọc</span>
        )}
      </p>

      {registrations.length === 0 ? (
        <p className="admin-page__empty">Chưa có ai đăng ký sự kiện nào.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Trạng thái</th>
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
                <tr
                  key={row.id}
                  className={
                    row.isRead ? undefined : "admin-table__row--unread"
                  }
                >
                  <td>
                    <button
                      type="button"
                      className={`admin-read-toggle${
                        row.isRead ? " admin-read-toggle--read" : ""
                      }`}
                      onClick={() => toggleRead(row.id, !row.isRead)}
                    >
                      {row.isRead ? "Đã đọc" : "Chưa đọc"}
                    </button>
                  </td>
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
    </>
  );
}
