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

export function AssessmentChat({ reportToken, verifiedToken }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyLoaded, setHistoryLoaded] = useState(false);
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

    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
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

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        setError(data.error || "Không nhận được phản hồi, vui lòng thử lại.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch {
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

  return (
    <div className="assessment-chat">
      <div className="assessment-chat__header">
        <span className="assessment-chat__header-icon">💬</span>
        <div>
          <p className="assessment-chat__title">Hỏi đáp với chuyên gia AI</p>
          <p className="assessment-chat__subtitle">
            Đặt câu hỏi về kết quả đánh giá của bạn — AI sẽ tư vấn dựa trên báo cáo này
          </p>
        </div>
      </div>

      <div className="assessment-chat__messages">
        {messages.length === 0 && (
          <div className="assessment-chat__empty">
            <p>Bạn có thể hỏi về bất kỳ điểm nào trong kết quả đánh giá.</p>
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

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`assessment-chat__message assessment-chat__message--${msg.role}`}
          >
            <span className="assessment-chat__message-label">
              {msg.role === "user" ? "Bạn" : "Chuyên gia AI"}
            </span>
            <p className="assessment-chat__message-text">{msg.content}</p>
          </div>
        ))}

        {loading && (
          <div className="assessment-chat__message assessment-chat__message--assistant">
            <span className="assessment-chat__message-label">Chuyên gia AI</span>
            <p className="assessment-chat__typing">
              <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        )}

        {error && (
          <p className="assessment-chat__error" role="alert">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="assessment-chat__input-row">
        <textarea
          ref={inputRef}
          className="assessment-chat__input"
          placeholder="Nhập câu hỏi của bạn... (Enter để gửi, Shift+Enter xuống dòng)"
          value={input}
          rows={2}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          type="button"
          className="assessment-chat__send"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Gửi"
        >
          {loading ? "…" : "→"}
        </button>
      </div>
    </div>
  );
}
