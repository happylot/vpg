"use client";

import { useState, type FormEvent } from "react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setError(result.error ?? "Đăng nhập thất bại.");
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch {
      setError("Không thể kết nối tới server.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <h1>Đăng nhập quản trị</h1>
      <p>Nhập mật khẩu để xem danh sách đăng ký sự kiện.</p>
      <form className="admin-login__form" onSubmit={handleSubmit}>
        <label>
          <span>Mật khẩu</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoFocus
          />
        </label>
        {error && (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="button button--primary"
          disabled={loading}
        >
          {loading ? "Đang kiểm tra..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
