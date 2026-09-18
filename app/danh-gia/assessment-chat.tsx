"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  reportToken: string;
  verifiedToken: string;
};

// Keeps AI usage cost bounded per report. The server (app/api/assessment/chat/route.ts)
// enforces this authoritatively — this copy only drives the UI's own feedback.
const MAX_USER_TURNS = 3;

const CEO_PHONE = "03587999999";

// Rotates through the input's placeholder so it always suggests a concrete question
// to ask, instead of a generic "type here" hint.
const PLACEHOLDER_EXAMPLES = [
  "Tôi cần cải thiện điều gì trước tiên?",
  "Doanh nghiệp tôi cần chứng nhận gì để xuất khẩu?",
  "Lộ trình xuất khẩu phù hợp với tôi là gì?",
  "Thị trường nào phù hợp với sản phẩm của tôi?",
  "Tôi nên bắt đầu chuẩn bị từ đâu?",
];

// Minimal inline-markdown: handles **bold** segments and newlines.
function renderMessageText(text: string) {
  return text.split("\n").map((line, idx) => {
    if (!line.trim()) return <br key={idx} />;

    const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    const lineContent = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });

    return (
      <p key={idx} style={{ margin: "0 0 6px 0" }}>
        {lineContent}
      </p>
    );
  });
}

function IconSend() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.5 2.5-8.4 19-3.3-8.3-8.3-3.3Z" />
      <path d="M21.5 2.5 9.8 14.2" />
    </svg>
  );
}

export function AssessmentChat({ reportToken, verifiedToken }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [placeholderExample] = useState(
    () => PLACEHOLDER_EXAMPLES[Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length)],
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load existing chat history on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await fetch(
          `/api/assessment/chat/history?reportToken=${encodeURIComponent(reportToken)}`,
          { headers: { "x-otp-token": verifiedToken } },
        );
        if (!response.ok) return;
        const data = (await response.json()) as {
          messages?: { role: string; content: string }[];
        };
        if (data.messages && data.messages.length > 0) {
          setMessages(
            data.messages.map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          );
        }
      } catch {
        // silently ignore — history is optional
      } finally {
        setHistoryLoaded(true);
      }
    }
    loadHistory();
  }, [reportToken, verifiedToken]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const currentUserTurns = messages.filter((m) => m.role === "user").length;
    if (currentUserTurns >= MAX_USER_TURNS) return;

    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const response = await fetch("/api/assessment/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-otp-token": verifiedToken,
        },
        body: JSON.stringify({ reportToken, message: text }),
      });

      if (!response.ok || !response.body) {
        let errMsg = "Không nhận được phản hồi, vui lòng thử lại.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) errMsg = data.error;
        } catch {
          // response wasn't JSON — keep default message
        }
        setMessages((prev) => prev.slice(0, -1));
        setError(errMsg);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const chunk = accumulated;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: chunk };
          return next;
        });
      }

      if (!accumulated) {
        setMessages((prev) => prev.slice(0, -1));
        setError("Không nhận được phản hồi, vui lòng thử lại.");
      }
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      setError("Không kết nối được server, vui lòng thử lại.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!historyLoaded) return null;

  const userTurnCount = messages.filter((m) => m.role === "user").length;
  const turnsLeft = Math.max(0, MAX_USER_TURNS - userTurnCount);
  const limitReached = turnsLeft <= 0;

  return (
    <div className="assessment-chat">
      <div className="assessment-chat__header">
        <img
          src="/bao-han-avatar.jpg"
          alt="Bảo Hân"
          className="assessment-chat__header-avatar"
        />
        <div>
          <p className="assessment-chat__title">
            Hỏi đáp với chuyên gia xuất khẩu Bảo Hân để cải thiện mức độ sẵn sàng của bạn
          </p>
          <p className="assessment-chat__subtitle">
            Đặt câu hỏi về kết quả đánh giá của bạn — Bảo Hân sẽ tư vấn dựa trên báo cáo này
          </p>
        </div>
      </div>

      <div className="assessment-chat__messages">
        {messages.length === 0 && (
          <div className="assessment-chat__empty">
            <img
              src="/bao-han-avatar.jpg"
              alt=""
              aria-hidden="true"
              className="assessment-chat__empty-avatar"
            />
            <p>Bạn có thể hỏi Bảo Hân về bất kỳ điểm nào trong kết quả đánh giá.</p>
            <div className="assessment-chat__suggestions">
              {[
                "Tôi cần cải thiện gì nhất?",
                "Tôi cần làm chứng nhận gì để xuất khẩu?",
                "Lộ trình xuất khẩu cho doanh nghiệp tôi nên như thế nào?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="assessment-chat__suggestion"
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          const isStreamingPlaceholder =
            msg.role === "assistant" && i === messages.length - 1 && loading && msg.content === "";

          if (msg.role === "assistant") {
            return (
              <div key={i} className="assessment-chat__message assessment-chat__message--assistant">
                <img
                  src="/bao-han-avatar.jpg"
                  alt="Bảo Hân"
                  className="assessment-chat__message-avatar"
                />
                <div className="assessment-chat__message-body">
                  <span className="assessment-chat__message-label">Bảo Hân</span>
                  {isStreamingPlaceholder ? (
                    <p className="assessment-chat__typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </p>
                  ) : (
                    <div className="assessment-chat__message-text">{renderMessageText(msg.content)}</div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={i} className="assessment-chat__message assessment-chat__message--user">
              <span className="assessment-chat__message-label">Bạn</span>
              <p className="assessment-chat__message-text">{msg.content}</p>
            </div>
          );
        })}

        {error && (
          <p className="assessment-chat__error" role="alert">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {limitReached ? (
        <p className="assessment-chat__limit-note">
          Bạn đã dùng hết {MAX_USER_TURNS} lượt hỏi cho bài đánh giá này. Hãy liên hệ trực tiếp với
          CEO: <a href={`tel:${CEO_PHONE}`}>{CEO_PHONE}</a>
        </p>
      ) : (
        <p className="assessment-chat__limit-note assessment-chat__limit-note--muted">
          Còn {turnsLeft}/{MAX_USER_TURNS} lượt hỏi cho bài đánh giá này.
        </p>
      )}

      <div className="assessment-chat__input-row">
        <textarea
          ref={inputRef}
          className="assessment-chat__input"
          placeholder={
            limitReached
              ? "Bạn đã dùng hết lượt hỏi cho bài đánh giá này"
              : `Ví dụ: “${placeholderExample}” · Enter để gửi`
          }
          value={input}
          rows={2}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || limitReached}
        />
        <button
          type="button"
          className="assessment-chat__send"
          onClick={sendMessage}
          disabled={loading || limitReached || !input.trim()}
          aria-label="Gửi"
        >
          {loading ? <span className="assessment-chat__send-spinner" aria-hidden="true" /> : <IconSend />}
        </button>
      </div>
    </div>
  );
}
