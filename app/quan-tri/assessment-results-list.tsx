"use client";

import { Fragment, useEffect, useState } from "react";

type FieldEntry = { label: string; value: string };
type ScoredEntry = { category: string; question: string; selected: string; points: number };
type CategoryScore = { category: string; max: number; score: number };
type AiRecommendation = { summary: string; items: { category: string; advice: string }[] };
type ChatMessage = { id: number; role: string; content: string; createdAt: string };

type AssessmentResult = {
  id: number;
  reportToken: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  branch: string;
  totalScore: number;
  levelLabel: string;
  businessEntries: FieldEntry[];
  profileEntries: FieldEntry[] | null;
  scoredEntries: ScoredEntry[];
  categoryScores: CategoryScore[];
  supportEntries: FieldEntry[];
  aiRecommendation: AiRecommendation | null;
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

export function AssessmentResultsList() {
  const [results, setResults] = useState<AssessmentResult[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>({});
  const [chatLoading, setChatLoading] = useState<Record<string, boolean>>({});


  async function load() {
    try {
      const response = await fetch("/api/admin/assessment-results/list", {
        cache: "no-store",
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? `Lỗi HTTP ${response.status}`);
      }
      const data = (await response.json()) as { results: AssessmentResult[] };
      setResults(data.results);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: number, isRead: boolean) {
    setResults((prev) => (prev ? prev.map((row) => (row.id === id ? { ...row, isRead } : row)) : prev));
    try {
      await fetch("/api/admin/assessment-results", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
    } catch {
      load();
    }
  }

  async function loadChatHistory(reportToken: string) {
    if (chatHistory[reportToken] !== undefined || chatLoading[reportToken]) return;
    setChatLoading((prev) => ({ ...prev, [reportToken]: true }));
    try {
      const response = await fetch(
        `/api/admin/assessment-results/chat-history?reportToken=${encodeURIComponent(reportToken)}`,
        { cache: "no-store" },
      );
      const data = (await response.json()) as { messages?: ChatMessage[] };
      setChatHistory((prev) => ({ ...prev, [reportToken]: data.messages ?? [] }));
    } catch {
      setChatHistory((prev) => ({ ...prev, [reportToken]: [] }));
    } finally {
      setChatLoading((prev) => ({ ...prev, [reportToken]: false }));
    }
  }

  async function deleteResult(id: number, companyName: string) {
    const label = companyName || `#${id}`;
    if (!window.confirm(`Xóa kết quả đánh giá của "${label}"? Hành động này không thể hoàn tác.`)) {
      return;
    }
    setResults((prev) => (prev ? prev.filter((row) => row.id !== id) : prev));
    try {
      await fetch("/api/admin/assessment-results", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      load();
    }
  }

  function toggleExpand(id: number, reportToken: string) {
    setExpandedId((prev) => (prev === id ? null : id));
    setExpandedCategory(null);
    if (results?.find((row) => row.id === id && !row.isRead)) {
      toggleRead(id, true);
    }
    // Load chat history lazily when the row is expanded
    if (reportToken) {
      loadChatHistory(reportToken);
    }
  }

  if (error) {
    return <p className="admin-page__empty">{error}</p>;
  }

  if (!results) {
    return <p className="admin-page__empty">Đang tải danh sách...</p>;
  }

  const unreadCount = results.filter((row) => !row.isRead).length;

  return (
    <>
      <p className="admin-page__count">
        {results.length} lượt đánh giá
        {unreadCount > 0 && <span className="admin-page__unread-badge">{unreadCount} chưa đọc</span>}
      </p>

      {results.length === 0 ? (
        <p className="admin-page__empty">Chưa có ai làm bài đánh giá.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Thời gian</th>
                <th>Doanh nghiệp</th>
                <th>Người liên hệ</th>
                <th>SĐT</th>
                <th>Nhánh</th>
                <th>Kết quả</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <Fragment key={row.id}>
                  <tr className={row.isRead ? undefined : "admin-table__row--unread"}>
                    <td>
                      <button
                        type="button"
                        className={`admin-read-toggle${row.isRead ? " admin-read-toggle--read" : ""}`}
                        onClick={() => toggleRead(row.id, !row.isRead)}
                      >
                        {row.isRead ? "Đã đọc" : "Chưa đọc"}
                      </button>
                    </td>
                    <td>
                      <div className="admin-table__datetime">
                        <span>{formatDate(row.createdAt)}</span>
                        <span className="admin-table__muted">{formatTime(row.createdAt)}</span>
                      </div>
                    </td>
                    <td className="admin-table__ellipsis" title={row.companyName}>
                      {row.companyName || "—"}
                    </td>
                    <td className="admin-table__ellipsis" title={row.contactName}>
                      {row.contactName || "—"}
                    </td>
                    <td>{row.phone || "—"}</td>
                    <td>{row.branch === "branch1" ? "Nhánh 1" : "Nhánh 2"}</td>
                    <td>
                      <div className="admin-table__score">
                        <strong>{row.totalScore}/100</strong>
                        <span className="admin-table__muted admin-table__ellipsis" title={row.levelLabel}>
                          {row.levelLabel}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-detail-toggle"
                          onClick={() => toggleExpand(row.id, row.reportToken)}
                        >
                          {expandedId === row.id ? "Ẩn" : "Chi tiết"}
                        </button>
                        {row.reportToken && (
                          <a
                            className="admin-detail-toggle"
                            href={`/api/assessment/report/${row.reportToken}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Tải PDF
                          </a>
                        )}
                        <button
                          type="button"
                          className="admin-detail-toggle admin-detail-toggle--danger"
                          onClick={() => deleteResult(row.id, row.companyName)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === row.id && (
                    <tr className="admin-detail-row">
                      <td colSpan={8}>
                        <div className="admin-detail">
                          <div className="admin-detail__section">
                            <h4>A — Thông tin doanh nghiệp</h4>
                            <dl className="admin-detail__list">
                              {row.businessEntries.map((entry, i) => (
                                <div className="admin-detail__item" key={i}>
                                  <dt>{entry.label}</dt>
                                  <dd>{entry.value || "—"}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {row.profileEntries && (
                            <div className="admin-detail__section">
                              <h4>Hiện trạng xuất khẩu</h4>
                              <dl className="admin-detail__list">
                                {row.profileEntries.map((entry, i) => (
                                  <div className="admin-detail__item" key={i}>
                                    <dt>{entry.label}</dt>
                                    <dd>{entry.value || "—"}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          )}

                          <div className="admin-detail__section">
                            <h4>
                              B — Đánh giá ({row.branch === "branch1" ? "Nhánh 1" : "Nhánh 2"}) —{" "}
                              {row.totalScore}/100 điểm — {row.levelLabel}
                            </h4>
                            <div className="admin-detail__scores-layout">
                              <div className="admin-detail__scores">
                                {row.categoryScores.map((c) => {
                                  const isCategoryOpen =
                                    expandedId === row.id && expandedCategory === c.category;
                                  const questions = row.scoredEntries.filter(
                                    (entry) => entry.category === c.category,
                                  );
                                  return (
                                    <div className="admin-score-group" key={c.category}>
                                      <button
                                        type="button"
                                        className={`score-row score-row--clickable${
                                          isCategoryOpen ? " score-row--open" : ""
                                        }`}
                                        onClick={() =>
                                          setExpandedCategory((prev) =>
                                            prev === c.category ? null : c.category,
                                          )
                                        }
                                      >
                                        <span>{c.category}</span>
                                        <div className="score-row__bar">
                                          <i style={{ width: `${(c.score / c.max) * 100}%` }} />
                                        </div>
                                        <strong>
                                          {c.score}/{c.max} {isCategoryOpen ? "▾" : "▸"}
                                        </strong>
                                      </button>
                                      {isCategoryOpen && (
                                        <div className="admin-detail__qa-group">
                                          {questions.map((entry, i) => (
                                            <div className="admin-detail__qa" key={i}>
                                              <p className="admin-detail__question">{entry.question}</p>
                                              <p className="admin-detail__answer">
                                                {entry.selected} <span>({entry.points} điểm)</span>
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {row.aiRecommendation && (
                                <div className="admin-recommendation">
                                  <h5>Khuyến nghị AI</h5>
                                  {row.aiRecommendation.summary && (
                                    <p className="admin-recommendation__summary">
                                      {row.aiRecommendation.summary}
                                    </p>
                                  )}
                                  <ul className="admin-recommendation__list">
                                    {row.aiRecommendation.items.map((item, i) => (
                                      <li key={i}>
                                        <strong>{item.category}:</strong> {item.advice}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="admin-detail__section">
                            <h4>C — Nhu cầu hỗ trợ</h4>
                            <dl className="admin-detail__list">
                              {row.supportEntries.map((entry, i) => (
                                <div className="admin-detail__item" key={i}>
                                  <dt>{entry.label}</dt>
                                  <dd>{entry.value || "—"}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          <div className="admin-detail__section">
                            <h4>D — Chat tư vấn AI</h4>
                            {chatLoading[row.reportToken] ? (
                              <p className="admin-page__empty">Đang tải lịch sử chat...</p>
                            ) : !chatHistory[row.reportToken] || chatHistory[row.reportToken].length === 0 ? (
                              <p className="admin-page__empty" style={{ fontSize: "0.85rem" }}>
                                Người dùng chưa sử dụng chat tư vấn.
                              </p>
                            ) : (
                              <div className="admin-chat-history">
                                {chatHistory[row.reportToken].map((msg) => (
                                  <div
                                    key={msg.id}
                                    className={`admin-chat-message admin-chat-message--${msg.role}`}
                                  >
                                    <span className="admin-chat-message__role">
                                      {msg.role === "user" ? "👤 Người dùng" : "🤖 AI"}
                                    </span>
                                    <p className="admin-chat-message__text">{msg.content}</p>
                                    <span className="admin-chat-message__time">
                                      {new Date(msg.createdAt).toLocaleString("vi-VN")}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
