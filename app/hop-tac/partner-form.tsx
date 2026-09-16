"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/hop-tac/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: data.get("companyName"),
          contactName: data.get("contactName"),
          phone: data.get("phone"),
          email: data.get("email"),
          productIndustry: data.get("productIndustry"),
          note: data.get("note"),
        }),
      });

      const result = (await response.json()) as { error?: string };

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
        <h3>Đã ghi nhận đăng ký hợp tác!</h3>
        <p>
          Cảm ơn bạn đã quan tâm hợp tác cùng MCV. Đội ngũ MCV sẽ liên hệ qua
          số điện thoại hoặc email bạn đã cung cấp để trao đổi chi tiết mô
          hình hợp tác phù hợp.
        </p>
        <button type="button" className="button button--ghost button--dark" onClick={() => setStatus("idle")}>
          Đăng ký thêm nhà máy khác
        </button>
      </div>
    );
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__grid">
        <label className="register-form__field">
          <span>
            Tên doanh nghiệp / nhà máy <em>*</em>
          </span>
          <input type="text" name="companyName" required placeholder="Công ty TNHH..." />
        </label>
        <label className="register-form__field">
          <span>Người liên hệ</span>
          <input type="text" name="contactName" placeholder="Nguyễn Văn A - Giám đốc" />
        </label>
        <label className="register-form__field">
          <span>
            Số điện thoại <em>*</em>
          </span>
          <input
            type="tel"
            name="phone"
            required
            placeholder="09xx xxx xxx"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </label>
        <label className="register-form__field">
          <span>Email</span>
          <input type="email" name="email" placeholder="ban@doanhnghiep.vn" />
        </label>
        <label className="register-form__field register-form__field--wide">
          <span>Ngành hàng / Sản phẩm chủ lực</span>
          <input type="text" name="productIndustry" placeholder="Ví dụ: Đồ gỗ nội thất, cà phê rang xay..." />
        </label>
        <label className="register-form__field register-form__field--wide">
          <span>Ghi chú</span>
          <textarea
            name="note"
            rows={3}
            placeholder="Sản phẩm hiện có, công suất sản xuất, hoặc câu hỏi bạn muốn trao đổi với MCV"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="register-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="button button--primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Đang gửi..." : "Đăng ký hợp tác"}
      </button>
    </form>
  );
}
