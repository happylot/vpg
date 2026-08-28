"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReadToggle({
  id,
  isRead,
}: {
  id: number;
  isRead: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !isRead }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={`admin-read-toggle${isRead ? " admin-read-toggle--read" : ""}`}
      onClick={toggle}
      disabled={loading}
    >
      {isRead ? "Đã đọc" : "Chưa đọc"}
    </button>
  );
}
