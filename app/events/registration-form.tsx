"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm({
  eventSlug,
  eventTitle,
}: {
  eventSlug: string;
  eventTitle: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug,
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          company: data.get("company"),
          role: data.get("role"),
          note: data.get("note"),
        }),
      });

      const result = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "Đăng ký chưa thành công, vui lòng thử lại.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
    }
  }

  if (status === "success") {
    return (
      <div className="register-form__success" role="status">
        <span aria-hidden="true">✓</span>
        <h3>Đăng ký thành công!</h3>
        <p>
          Cảm ơn bạn đã đăng ký tham gia <strong>{eventTitle}</strong>. Ban tổ
          chức Vproud sẽ liên hệ xác nhận qua số điện thoại hoặc email bạn đã
          cung cấp.
        </p>
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setStatus("idle")}
        >
          Đăng ký thêm một người khác
        </button>
      </div>
    );
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__grid">
        <label className="register-form__field">
          <span>
            Họ và tên <em>*</em>
          </span>
          <input type="text" name="fullName" required placeholder="Nguyễn Văn A" />
        </label>
        <label className="register-form__field">
          <span>
            Số điện thoại <em>*</em>
          </span>
          <input type="tel" name="phone" required placeholder="09xx xxx xxx" />
        </label>
        <label className="register-form__field">
          <span>Email</span>
          <input type="email" name="email" placeholder="ban@doanhnghiep.vn" />
        </label>
        <label className="register-form__field">
          <span>Doanh nghiệp / Tổ chức</span>
          <input type="text" name="company" placeholder="Tên doanh nghiệp" />
        </label>
        <label className="register-form__field">
          <span>Chức vụ</span>
          <input type="text" name="role" placeholder="Ví dụ: Giám đốc kinh doanh" />
        </label>
        <label className="register-form__field register-form__field--wide">
          <span>Ghi chú</span>
          <textarea
            name="note"
            rows={3}
            placeholder="Câu hỏi hoặc mong muốn của bạn khi tham gia sự kiện"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="register-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="button button--primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Đang gửi..." : "Đăng ký tham gia"}
      </button>
    </form>
  );
}
