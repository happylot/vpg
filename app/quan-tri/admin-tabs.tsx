"use client";

import { useState } from "react";
import { AssessmentResultsList } from "./assessment-results-list";
import { PartnerInquiriesList } from "./partner-inquiries-list";
import { RegistrationsList } from "./registrations-list";

type Tab = "registrations" | "assessments" | "partners";

const TAB_LABELS: Record<Tab, string> = {
  registrations: "Danh sách đăng ký sự kiện",
  assessments: "Kết quả đánh giá",
  partners: "Đăng ký hợp tác nhà máy",
};

export function AdminTabs() {
  const [tab, setTab] = useState<Tab>("registrations");

  return (
    <>
      <div className="admin-page__header">
        <div>
          <p className="section-label">Quản trị</p>
          <h1>{TAB_LABELS[tab]}</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--dark">
            Đăng xuất
          </button>
        </form>
      </div>

      <div className="admin-tabs">
        {(Object.keys(TAB_LABELS) as Tab[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`admin-tab${tab === key ? " admin-tab--active" : ""}`}
            onClick={() => setTab(key)}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {tab === "registrations" && <RegistrationsList />}
      {tab === "assessments" && <AssessmentResultsList />}
      {tab === "partners" && <PartnerInquiriesList />}
    </>
  );
}
