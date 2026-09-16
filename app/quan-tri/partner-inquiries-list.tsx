"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  id: number;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  productIndustry: string;
  note: string;
  isRead: boolean;
  createdAt: string;
};

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

export function PartnerInquiriesList() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/admin/partner-inquiries/list", {
        cache: "no-store",
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? `Lỗi HTTP ${response.status}`);
      }
      const data = (await response.json()) as { inquiries: Inquiry[] };
      setInquiries(data.inquiries);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: number, isRead: boolean) {
    setInquiries((prev) => (prev ? prev.map((row) => (row.id === id ? { ...row, isRead } : row)) : prev));
    try {
      await fetch("/api/admin/partner-inquiries", {
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

  if (!inquiries) {
    return <p className="admin-page__empty">Đang tải danh sách...</p>;
  }

  const unreadCount = inquiries.filter((row) => !row.isRead).length;

  return (
    <>
      <p className="admin-page__count">
        {inquiries.length} lượt đăng ký hợp tác
        {unreadCount > 0 && <span className="admin-page__unread-badge">{unreadCount} chưa đọc</span>}
      </p>

      {inquiries.length === 0 ? (
        <p className="admin-page__empty">Chưa có nhà máy nào đăng ký hợp tác.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Doanh nghiệp / Nhà máy</th>
                <th>Người liên hệ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ngành hàng / Sản phẩm</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((row) => (
                <tr key={row.id} className={row.isRead ? undefined : "admin-table__row--unread"}>
                  <td>
                    <button
                      type="button"
                      className={`admin-read-toggle${row.isRead ? " admin-read-toggle--read" : ""}`}
                      onClick={() => toggleRead(row.id, !row.isRead)}
                    >
                      {row.isRead ? "Đã đọc" : "Chưa đọc"}
                    </button>
                  </td>
                  <td>{formatDate(row.createdAt)}</td>
                  <td>{formatTime(row.createdAt)}</td>
                  <td>{row.companyName}</td>
                  <td>{row.contactName || "—"}</td>
                  <td>{row.phone}</td>
                  <td>{row.email || "—"}</td>
                  <td>{row.productIndustry || "—"}</td>
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
