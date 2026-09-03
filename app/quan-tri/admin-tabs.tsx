"use client";

import { useState } from "react";
import { AssessmentResultsList } from "./assessment-results-list";
import { RegistrationsList } from "./registrations-list";

type Tab = "registrations" | "assessments";

export function AdminTabs() {
  const [tab, setTab] = useState<Tab>("registrations");

  return (
    <>
      <div className="admin-page__header">
        <div>
          <p className="section-label">Quản trị</p>
          <h1>{tab === "registrations" ? "Danh sách đăng ký sự kiện" : "Kết quả đánh giá"}</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--dark">
            Đăng xuất
          </button>
        </form>
      </div>

      <div className="admin-tabs">
        <button
          type="button"
          className={`admin-tab${tab === "registrations" ? " admin-tab--active" : ""}`}
          onClick={() => setTab("registrations")}
        >
          Danh sách đăng ký sự kiện
        </button>
        <button
          type="button"
          className={`admin-tab${tab === "assessments" ? " admin-tab--active" : ""}`}
          onClick={() => setTab("assessments")}
        >
          Kết quả đánh giá
        </button>
      </div>

      {tab === "registrations" ? <RegistrationsList /> : <AssessmentResultsList />}
    </>
  );
}
