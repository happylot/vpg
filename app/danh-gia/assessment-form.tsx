"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  assessmentQuestionsBranch1,
  assessmentQuestionsBranch2,
  branch2ProfileFields,
  businessInfoFields,
  getReadinessLevel,
  supportFields,
  type AssessmentQuestion,
  type BusinessCheckboxField,
  type BusinessField,
} from "./questions";
import { AssessmentChat } from "./assessment-chat";

function IconSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.28 0 .53.18.62.45l1.64 4.9 4.9 1.64a.66.66 0 0 1 0 1.24l-4.9 1.64-1.64 4.9a.66.66 0 0 1-1.24 0l-1.64-4.9-4.9-1.64a.66.66 0 0 1 0-1.24l4.9-1.64 1.64-4.9c.09-.27.34-.45.62-.45Z" />
    </svg>
  );
}

function IconFileText({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8.5 13h7M8.5 17h7" />
    </svg>
  );
}

function IconCompass({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </svg>
  );
}

type Answers = Record<string, number>;
type FieldAnswers = Record<string, string | string[]>;
type OtherValues = Record<string, string>;
type Step = "otp-email" | "otp-code" | "history" | "business" | "assessment" | "support" | "result";
type AiRecommendation = {
  levelLabel: string;
  levelDesc: string;
  summary: string;
  items: { category: string; advice: string }[];
};
type PastReport = {
  reportToken: string;
  companyName: string;
  totalScore: number;
  levelLabel: string;
  createdAt: string;
};
type ViewedResult = {
  reportToken: string;
  companyName: string;
  totalScore: number;
  aiRecommendation: AiRecommendation | null;
};

function formatReportDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function groupByCategory(questions: AssessmentQuestion[]) {
  const groups: { category: string; categoryMax: number; questions: AssessmentQuestion[] }[] = [];
  for (const question of questions) {
    let group = groups.find((g) => g.category === question.category);
    if (!group) {
      group = { category: question.category, categoryMax: question.categoryMax, questions: [] };
      groups.push(group);
    }
    group.questions.push(question);
  }
  return groups;
}

function isFieldComplete(field: BusinessField, value: string | string[] | undefined) {
  if (!field.required) return true;
  if (field.kind === "checkbox") {
    return Array.isArray(value) && value.length > 0 && value.length <= field.maxSelect;
  }
  return typeof value === "string" && value.trim().length > 0;
}

function makeFieldHandlers(
  setAnswers: React.Dispatch<React.SetStateAction<FieldAnswers>>,
  setOtherValues: React.Dispatch<React.SetStateAction<OtherValues>>,
) {
  function setText(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }
  function setRadio(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }
  function setOtherRadio(id: string, value: string) {
    setOtherValues((prev) => ({ ...prev, [id]: value }));
    setAnswers((prev) => ({ ...prev, [id]: value ? `Khác: ${value}` : "" }));
  }
  function toggleCheckbox(field: BusinessCheckboxField, option: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[field.id]) ? (prev[field.id] as string[]) : [];
      const already = current.includes(option);
      if (already) return { ...prev, [field.id]: current.filter((v) => v !== option) };
      if (current.length >= field.maxSelect) return prev;
      return { ...prev, [field.id]: [...current, option] };
    });
  }
  function setOtherCheckbox(field: BusinessCheckboxField, value: string) {
    setOtherValues((prev) => ({ ...prev, [field.id]: value }));
    setAnswers((prev) => {
      const current = Array.isArray(prev[field.id]) ? (prev[field.id] as string[]) : [];
      const withoutOther = current.filter((v) => !v.startsWith("Khác: "));
      if (!value) return { ...prev, [field.id]: withoutOther };
      if (withoutOther.length >= field.maxSelect && !current.some((v) => v.startsWith("Khác: "))) {
        return prev;
      }
      return { ...prev, [field.id]: [...withoutOther, `Khác: ${value}`] };
    });
  }
  return { setText, setRadio, setOtherRadio, toggleCheckbox, setOtherCheckbox };
}

function FieldsGroup({
  fields,
  answers,
  otherValues,
  handlers,
  startIndex = 1,
  showNumbers = true,
}: {
  fields: BusinessField[];
  answers: FieldAnswers;
  otherValues: OtherValues;
  handlers: ReturnType<typeof makeFieldHandlers>;
  startIndex?: number;
  showNumbers?: boolean;
}) {
  return (
    <div className="assessment-business-grid">
      {fields.map((field, index) => {
        const prefix = showNumbers ? `Câu ${startIndex + index}. ` : "";

        if (field.kind === "text") {
          return (
            <label className="assessment-field" key={field.id}>
              <span className="assessment-field__label">
                {prefix}
                {field.label} {field.required && <em>*</em>}
              </span>
              <input
                type={field.type ?? "text"}
                required={field.required}
                placeholder={field.placeholder}
                inputMode={field.type === "tel" ? "numeric" : undefined}
                pattern={field.type === "tel" ? "[0-9]*" : undefined}
                value={typeof answers[field.id] === "string" ? (answers[field.id] as string) : ""}
                onChange={(e) => {
                  const value =
                    field.type === "tel" ? e.target.value.replace(/[^0-9]/g, "") : e.target.value;
                  handlers.setText(field.id, value);
                }}
              />
            </label>
          );
        }

        if (field.kind === "radio") {
          return (
            <fieldset className="assessment-question assessment-field--wide" key={field.id}>
              <legend>
                {prefix}
                {field.label} {field.required && <em>*</em>}
              </legend>
              <div className="assessment-options">
                {field.options.map((option) => (
                  <label className="assessment-option" key={option}>
                    <input
                      type="radio"
                      name={field.id}
                      checked={answers[field.id] === option}
                      onChange={() => handlers.setRadio(field.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
                {field.allowOther && (
                  <label className="assessment-option">
                    <input
                      type="radio"
                      name={field.id}
                      checked={
                        typeof answers[field.id] === "string" &&
                        (answers[field.id] as string).startsWith("Khác: ")
                      }
                      onChange={() => {
                        if (otherValues[field.id]) handlers.setOtherRadio(field.id, otherValues[field.id]);
                      }}
                    />
                    <span className="assessment-option__other-row">
                      Mục khác:
                      <input
                        type="text"
                        className="assessment-option__other"
                        value={otherValues[field.id] ?? ""}
                        onChange={(e) => handlers.setOtherRadio(field.id, e.target.value)}
                        placeholder="Ghi rõ"
                      />
                    </span>
                  </label>
                )}
              </div>
            </fieldset>
          );
        }

        const selected = Array.isArray(answers[field.id]) ? (answers[field.id] as string[]) : [];
        return (
          <fieldset className="assessment-question assessment-field--wide" key={field.id}>
            <legend>
              {prefix}
              {field.label} {field.required && <em>*</em>}
            </legend>
            <div className="assessment-options">
              {field.options.map((option) => (
                <label className="assessment-option" key={option}>
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => handlers.toggleCheckbox(field, option)}
                    disabled={!selected.includes(option) && selected.length >= field.maxSelect}
                  />
                  <span>{option}</span>
                </label>
              ))}
              {field.allowOther && (
                <label className="assessment-option">
                  <input
                    type="checkbox"
                    checked={selected.some((v) => v.startsWith("Khác: "))}
                    onChange={() =>
                      handlers.setOtherCheckbox(field, otherValues[field.id] ? "" : otherValues[field.id] ?? "")
                    }
                    disabled={
                      !selected.some((v) => v.startsWith("Khác: ")) && selected.length >= field.maxSelect
                    }
                  />
                  <span className="assessment-option__other-row">
                    Mục khác:
                    <input
                      type="text"
                      className="assessment-option__other"
                      value={otherValues[field.id] ?? ""}
                      onChange={(e) => handlers.setOtherCheckbox(field, e.target.value)}
                      placeholder="Ghi rõ"
                    />
                  </span>
                </label>
              )}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

export function AssessmentForm() {
  const [step, setStep] = useState<Step>("otp-email");

  useEffect(() => {
    if (!window.history.state || window.history.state.assessmentStep === undefined) {
      window.history.replaceState({ assessmentStep: "otp-email" }, "");
    }

    function onPopState(event: PopStateEvent) {
      const nextStep = (event.state?.assessmentStep as Step | undefined) ?? "otp-email";
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function goToStep(next: Step) {
    setStep(next);
    window.history.pushState({ assessmentStep: next }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    window.history.back();
  }

  const [business, setBusiness] = useState<FieldAnswers>({});
  const [businessOther, setBusinessOther] = useState<OtherValues>({});
  const [businessError, setBusinessError] = useState("");
  const businessHandlers = makeFieldHandlers(setBusiness, setBusinessOther);

  const [profile, setProfile] = useState<FieldAnswers>({});
  const [profileOther, setProfileOther] = useState<OtherValues>({});
  const profileHandlers = makeFieldHandlers(setProfile, setProfileOther);

  const [support, setSupport] = useState<FieldAnswers>({});
  const [supportOther, setSupportOther] = useState<OtherValues>({});
  const supportHandlers = makeFieldHandlers(setSupport, setSupportOther);

  const [answers, setAnswers] = useState<Answers>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [reportToken, setReportToken] = useState<string | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<AiRecommendation | null>(null);
  const [resultLoading, setResultLoading] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");
  const [otpPendingToken, setOtpPendingToken] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);

  const [pastReports, setPastReports] = useState<PastReport[]>([]);
  const [viewedResult, setViewedResult] = useState<ViewedResult | null>(null);
  const [historyDetailLoading, setHistoryDetailLoading] = useState(false);
  const [historyDetailError, setHistoryDetailError] = useState("");
  const [reportOpening, setReportOpening] = useState(false);
  const [reportError, setReportError] = useState("");

  const exportExperience = typeof business.exportExperience === "string" ? business.exportExperience : "";
  const branch = exportExperience === "Chưa từng" ? "branch1" : "branch2";
  const scoredQuestions = branch === "branch1" ? assessmentQuestionsBranch1 : assessmentQuestionsBranch2;

  const groups = useMemo(() => groupByCategory(scoredQuestions), [scoredQuestions]);
  const totalQuestions = scoredQuestions.length;
  const answeredCount = scoredQuestions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = answeredCount === totalQuestions;

  const categoryScores = useMemo(() => {
    return groups.map((group) => {
      const score = group.questions.reduce((sum, q) => {
        const optionIndex = answers[q.id];
        const points = optionIndex !== undefined ? q.options[optionIndex]?.points ?? 0 : 0;
        return sum + points;
      }, 0);
      return { category: group.category, max: group.categoryMax, score };
    });
  }, [groups, answers]);

  const totalScore = categoryScores.reduce((sum, c) => sum + c.score, 0);
  const companyName = typeof business.companyName === "string" ? business.companyName : "";

  function selectAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  async function requestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = otpEmail.trim();
    if (!trimmedEmail) {
      setOtpError("Vui lòng nhập email.");
      return;
    }
    setOtpError("");
    setOtpLoading(true);
    try {
      const response = await fetch("/api/assessment/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = (await response.json()) as { token?: string; error?: string };
      if (!response.ok || !data.token) {
        setOtpError(data.error || "Không thể gửi mã xác nhận, vui lòng thử lại.");
        return;
      }
      setOtpPendingToken(data.token);
      setOtpCode("");
      goToStep("otp-code");
    } catch {
      setOtpError("Không thể gửi mã xác nhận, vui lòng kiểm tra kết nối mạng.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function resendOtp() {
    const trimmedEmail = otpEmail.trim();
    if (!trimmedEmail) return;
    setOtpError("");
    setOtpLoading(true);
    try {
      const response = await fetch("/api/assessment/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = (await response.json()) as { token?: string; error?: string };
      if (!response.ok || !data.token) {
        setOtpError(data.error || "Không thể gửi lại mã xác nhận.");
        return;
      }
      setOtpPendingToken(data.token);
      setOtpCode("");
    } catch {
      setOtpError("Không thể gửi lại mã, vui lòng kiểm tra kết nối mạng.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!otpPendingToken) {
      setOtpError("Phiên xác nhận đã hết hạn, vui lòng gửi lại mã.");
      goToStep("otp-email");
      return;
    }
    setOtpError("");
    setOtpLoading(true);
    try {
      const response = await fetch("/api/assessment/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otpPendingToken, otp: otpCode.trim() }),
      });
      const data = (await response.json()) as { token?: string; error?: string };
      if (!response.ok || !data.token) {
        setOtpError(data.error || "Mã xác nhận không đúng.");
        return;
      }
      setVerifiedToken(data.token);
      setBusiness((prev) => ({ ...prev, email: otpEmail.trim() }));

      try {
        const historyResponse = await fetch("/api/assessment/history", {
          headers: { "x-otp-token": data.token },
        });
        const historyData = (await historyResponse.json()) as { reports?: PastReport[] };
        if (historyResponse.ok && historyData.reports && historyData.reports.length > 0) {
          setPastReports(historyData.reports);
          goToStep("history");
          return;
        }
      } catch {
        // History lookup is a convenience — fall through to a new assessment.
      }
      goToStep("business");
    } catch {
      setOtpError("Không thể xác nhận mã, vui lòng kiểm tra kết nối mạng.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function viewPastReport(token: string) {
    setHistoryDetailError("");
    setHistoryDetailLoading(true);
    setViewedResult(null);
    setReportToken(token);
    goToStep("result");
    try {
      const response = await fetch(`/api/assessment/history/${encodeURIComponent(token)}`, {
        headers: { "x-otp-token": verifiedToken ?? "" },
      });
      const data = (await response.json()) as { result?: ViewedResult; error?: string };
      if (!response.ok || !data.result) {
        setHistoryDetailError(data.error || "Không tải được bài đánh giá.");
        return;
      }
      setViewedResult(data.result);
    } catch {
      setHistoryDetailError("Không kết nối được server.");
    } finally {
      setHistoryDetailLoading(false);
    }
  }

  async function openReportPdf() {
    if (!reportToken || !verifiedToken || reportOpening) return;
    setReportError("");
    setReportOpening(true);
    try {
      const response = await fetch(`/api/assessment/report/${encodeURIComponent(reportToken)}`, {
        headers: { "x-otp-token": verifiedToken },
      });
      if (!response.ok) {
        setReportError("Không tải được báo cáo PDF, vui lòng thử lại.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setReportError("Không kết nối được server, vui lòng thử lại.");
    } finally {
      setReportOpening(false);
    }
  }

  function startNewAssessment() {
    setViewedResult(null);
    setReportToken(null);
    setAiRecommendation(null);
    setBusiness((prev) => ({ email: prev.email }));
    setBusinessOther({});
    setProfile({});
    setProfileOther({});
    setSupport({});
    setSupportOther({});
    setAnswers({});
    goToStep("business");
  }

  async function goToHistory() {
    if (verifiedToken) {
      try {
        const response = await fetch("/api/assessment/history", {
          headers: { "x-otp-token": verifiedToken },
        });
        const data = (await response.json()) as { reports?: PastReport[] };
        if (response.ok && data.reports) setPastReports(data.reports);
      } catch {
        // Keep whatever list we already have.
      }
    }
    setViewedResult(null);
    goToStep("history");
  }

  function handleBusinessSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = businessInfoFields.find((field) => !isFieldComplete(field, business[field.id]));
    if (missing) {
      setBusinessError("Vui lòng trả lời đầy đủ các câu hỏi bắt buộc trước khi tiếp tục.");
      return;
    }
    setBusinessError("");
    goToStep("assessment");
  }

  function handleAssessmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!allAnswered) return;
    goToStep("support");
  }

  function handleSupportSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultLoading(true);
    goToStep("result");
    submitAssessment().finally(() => setResultLoading(false));
  }

  async function submitAssessment() {
    const payload = {
      business,
      branch,
      profile: branch === "branch2" ? profile : undefined,
      answers,
      support,
    };
    try {
      const response = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(verifiedToken ? { "X-Otp-Token": verifiedToken } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        result?: { reportToken?: string; aiRecommendation?: AiRecommendation | null };
      };
      if (response.ok && data.result?.reportToken) {
        setReportToken(data.result.reportToken);
        setAiRecommendation(data.result.aiRecommendation ?? null);
      }
    } catch (error) {
      console.error("Không thể lưu kết quả đánh giá:", error);
    }
  }

  if (step === "result") {
    const displayCompanyName = viewedResult ? viewedResult.companyName : companyName;
    const displayTotalScore = viewedResult ? viewedResult.totalScore : totalScore;
    const displayAiRecommendation = viewedResult ? viewedResult.aiRecommendation : aiRecommendation;
    const displayLevel = getReadinessLevel(displayTotalScore);
    const isLoading = resultLoading || historyDetailLoading;

    return (
      <>
        <div className="assessment-result">
          {pastReports.length > 0 && (
            <button type="button" className="assessment-result__back-link" onClick={goToHistory}>
              ← Quay lại danh sách bài đánh giá
            </button>
          )}

          {/* ── Score header ── */}
          <p className="assessment-result__label">Kết quả đánh giá</p>

          {historyDetailError ? (
            <p className="register-form__error" role="alert">
              {historyDetailError}
            </p>
          ) : isLoading ? (
            <div className="assessment-result__skeleton" role="status" aria-live="polite">
              <div className="assessment-result__skeleton-bar assessment-result__skeleton-bar--score" />
              <div className="assessment-result__skeleton-bar assessment-result__skeleton-bar--badge" />
              <div className="assessment-result__skeleton-bar" />
              <div className="assessment-result__skeleton-bar assessment-result__skeleton-bar--short" />
              <div className="assessment-result__skeleton-card" />
              <p className="assessment-result__skeleton-caption">
                <span className="assessment-result__spinner" aria-hidden="true" />
                {historyDetailLoading
                  ? "Đang tải bài đánh giá..."
                  : "Đang phân tích câu trả lời và tạo khuyến nghị dành riêng cho doanh nghiệp của bạn..."}
              </p>
            </div>
          ) : (
            <>
              <div className="assessment-result__score">
                <strong>{displayTotalScore}</strong>
                <span>/ 100 điểm</span>
              </div>

              <div
                className="assessment-result__score-bar"
                role="img"
                aria-label={`${displayTotalScore} trên 100 điểm`}
              >
                <div
                  className="assessment-result__score-bar-fill"
                  style={{ width: `${Math.min(100, Math.max(0, displayTotalScore))}%` }}
                />
              </div>

              <div className="assessment-result__identity">
                {displayCompanyName && (
                  <span className="assessment-result__company">{displayCompanyName}</span>
                )}
                <span className="assessment-result__level-badge">
                  {displayAiRecommendation?.levelLabel ?? displayLevel.label}
                </span>
              </div>

              <p className="assessment-result__desc">
                {displayAiRecommendation?.levelDesc ?? displayLevel.desc}
              </p>

              {/* ── Recommendation ── */}
              {displayAiRecommendation && (
                <div className="assessment-recommendation assessment-recommendation--full">
                  <div className="assessment-recommendation__header">
                    <span className="assessment-recommendation__icon">
                      <IconSparkle />
                    </span>
                    <p className="assessment-recommendation__label">Khuyến nghị dành cho bạn</p>
                  </div>
                  {displayAiRecommendation.summary && (
                    <p className="assessment-recommendation__summary">{displayAiRecommendation.summary}</p>
                  )}
                  {displayAiRecommendation.items.length > 0 && (
                    <div className="assessment-recommendation__section-title">
                      Các điểm cần ưu tiên cải thiện
                    </div>
                  )}
                  <ul className="assessment-recommendation__list">
                    {displayAiRecommendation.items.map((item, i) => (
                      <li key={i} className="assessment-recommendation__item">
                        <div className="assessment-recommendation__item-header">
                          <span className="assessment-recommendation__number">{i + 1}</span>
                          <strong className="assessment-recommendation__category">{item.category}</strong>
                        </div>
                        <p className="assessment-recommendation__advice">{item.advice}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {!isLoading && !historyDetailError && reportToken && verifiedToken && (
          <div className="assessment-chat-wrapper">
            <AssessmentChat key={reportToken} reportToken={reportToken} verifiedToken={verifiedToken} />
          </div>
        )}

        {!isLoading && !historyDetailError && (
          <>
            <div className="assessment-result__cta-row">
              {reportToken && verifiedToken && (
                <button
                  type="button"
                  className="assessment-result__cta-card"
                  onClick={openReportPdf}
                  disabled={reportOpening}
                >
                  <span className="assessment-result__cta-icon">
                    <IconFileText />
                  </span>
                  <span className="assessment-result__cta-title">
                    {reportOpening ? "Đang mở báo cáo..." : "Xem chi tiết báo cáo"}
                  </span>
                  <span className="assessment-result__cta-sub">Tải báo cáo PDF đầy đủ</span>
                </button>
              )}
              <a className="assessment-result__cta-card" href="/events">
                <span className="assessment-result__cta-icon">
                  <IconCompass />
                </span>
                <span className="assessment-result__cta-title">Xem chương trình phù hợp</span>
                <span className="assessment-result__cta-sub">Chương trình hỗ trợ xuất khẩu dành cho bạn</span>
              </a>
            </div>
            {reportError && (
              <p className="register-form__error" role="alert">
                {reportError}
              </p>
            )}
          </>
        )}
      </>
    );
  }

  if (step === "history") {
    return (
      <div className="assessment-history">
        <p className="assessment-result__label">Bài đánh giá của bạn</p>
        <h3 className="assessment-history__title">
          Email này đã có {pastReports.length} bài đánh giá trước đó
        </h3>
        <p className="assessment-history__desc">
          Xem lại kết quả cũ hoặc bắt đầu một bài đánh giá mới.
        </p>

        <ul className="assessment-history__list">
          {pastReports.map((report) => (
            <li key={report.reportToken} className="assessment-history__item">
              <div className="assessment-history__item-info">
                <strong>{report.companyName || "(Chưa rõ tên doanh nghiệp)"}</strong>
                <span className="assessment-history__item-meta">
                  {report.totalScore}/100 điểm · {report.levelLabel} · {formatReportDate(report.createdAt)}
                </span>
              </div>
              <button
                type="button"
                className="button button--ghost button--dark"
                onClick={() => viewPastReport(report.reportToken)}
              >
                Xem lại
              </button>
            </li>
          ))}
        </ul>

        <div className="assessment-form__footer">
          <p>Hoặc bắt đầu một đánh giá mới</p>
          <button type="button" className="button button--primary" onClick={startNewAssessment}>
            Làm bài đánh giá mới
          </button>
        </div>
      </div>
    );
  }

  if (step === "otp-email") {
    return (
      <form className="assessment-form" onSubmit={requestOtp}>
        <div className="assessment-group">
          <div className="assessment-group__head">
            <h3>Xác nhận email trước khi bắt đầu</h3>
          </div>
          <p className="assessment-otp__intro">
            Vproud sẽ gửi một mã xác nhận gồm 6 chữ số tới email của bạn để đảm bảo kết quả đánh
            giá được gửi đúng người.
          </p>
          <div className="assessment-business-grid">
            <label className="assessment-field">
              <span className="assessment-field__label">
                Email nhận mã xác nhận <em>*</em>
              </span>
              <input
                type="email"
                required
                placeholder="ban@doanhnghiep.vn"
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
              />
            </label>
          </div>
        </div>

        {otpError && (
          <p className="register-form__error" role="alert">
            {otpError}
          </p>
        )}

        <div className="assessment-form__footer">
          <p>Bước xác nhận email</p>
          <button type="submit" className="button button--primary" disabled={otpLoading}>
            {otpLoading ? "Đang gửi mã..." : "Gửi mã xác nhận"}
          </button>
        </div>
      </form>
    );
  }

  if (step === "otp-code") {
    return (
      <form className="assessment-form" onSubmit={verifyOtp}>
        <div className="assessment-group">
          <div className="assessment-group__head">
            <h3>Nhập mã xác nhận</h3>
          </div>
          <p className="assessment-otp__intro">
            Mã xác nhận gồm 6 chữ số vừa được gửi tới <strong>{otpEmail}</strong>. Mã có hiệu lực
            trong 10 phút.
          </p>
          <div className="assessment-business-grid">
            <label className="assessment-field">
              <span className="assessment-field__label">
                Mã xác nhận <em>*</em>
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
              />
            </label>
          </div>
          <button
            type="button"
            className="assessment-otp__resend"
            onClick={resendOtp}
            disabled={otpLoading}
          >
            Không nhận được mã? Gửi lại
          </button>
        </div>

        {otpError && (
          <p className="register-form__error" role="alert">
            {otpError}
          </p>
        )}

        <div className="assessment-form__footer">
          <button
            type="button"
            className="button button--ghost button--dark"
            onClick={() => goToStep("otp-email")}
          >
            Đổi email khác
          </button>
          <button
            type="submit"
            className="button button--primary"
            disabled={otpLoading || otpCode.length !== 6}
          >
            {otpLoading ? "Đang xác nhận..." : "Xác nhận"}
          </button>
        </div>
      </form>
    );
  }

  if (step === "business") {
    return (
      <form className="assessment-form" onSubmit={handleBusinessSubmit}>
        <div className="assessment-group">
          <div className="assessment-group__head">
            <h3>A — Thông tin doanh nghiệp</h3>
          </div>
          <FieldsGroup
            fields={businessInfoFields}
            answers={business}
            otherValues={businessOther}
            handlers={businessHandlers}
            showNumbers={false}
          />
        </div>

        {businessError && (
          <p className="register-form__error" role="alert">
            {businessError}
          </p>
        )}

        <div className="assessment-form__footer">
          <p>Phần A — Thông tin doanh nghiệp</p>
          <button type="submit" className="button button--primary">
            Tiếp tục sang phần đánh giá
          </button>
        </div>
      </form>
    );
  }

  if (step === "support") {
    return (
      <form className="assessment-form" onSubmit={handleSupportSubmit}>
        <div className="assessment-group">
          <div className="assessment-group__head">
            <h3>C — Nhu cầu hỗ trợ</h3>
          </div>
          <FieldsGroup
            fields={supportFields}
            answers={support}
            otherValues={supportOther}
            handlers={supportHandlers}
          />
        </div>

        <div className="assessment-form__footer">
          <button type="button" className="button button--ghost button--dark" onClick={goBack}>
            Quay lại
          </button>
          <p>Phần C — Nhu cầu hỗ trợ</p>
          <button type="submit" className="button button--primary">
            Xem kết quả đánh giá
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="assessment-form" onSubmit={handleAssessmentSubmit}>
      <div className="assessment-group">
        <div className="assessment-group__head">
          <h3>
            B — {branch === "branch1" ? "Nhánh 1 · Đánh giá mức sẵn sàng" : "Nhánh 2 · Đánh giá mức trưởng thành xuất khẩu"}
          </h3>
        </div>
      </div>

      {branch === "branch2" && (
        <div className="assessment-group">
          <div className="assessment-group__head">
            <h3>Hiện trạng xuất khẩu (không tính điểm)</h3>
          </div>
          <FieldsGroup
            fields={branch2ProfileFields}
            answers={profile}
            otherValues={profileOther}
            handlers={profileHandlers}
          />
        </div>
      )}

      {groups.map((group) => (
        <div className="assessment-group" key={group.category}>
          <div className="assessment-group__head">
            <h3>{group.category}</h3>
            <span>{group.categoryMax} điểm</span>
          </div>

          {group.questions.map((question) => (
            <fieldset className="assessment-question" key={question.id}>
              <legend>
                Câu {scoredQuestions.indexOf(question) + 1 + (branch === "branch2" ? branch2ProfileFields.length : 0)}
                . {question.text}
              </legend>
              <div className="assessment-options">
                {question.options.map((option, optionIndex) => (
                  <label className="assessment-option" key={option.label}>
                    <input
                      type="radio"
                      name={question.id}
                      value={optionIndex}
                      checked={answers[question.id] === optionIndex}
                      onChange={() => selectAnswer(question.id, optionIndex)}
                      required
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      ))}

      <div className="assessment-form__footer">
        <button type="button" className="button button--ghost button--dark" onClick={goBack}>
          Quay lại
        </button>
        <p>
          Đã trả lời {answeredCount}/{totalQuestions} câu hỏi
        </p>
        <button type="submit" className="button button--primary" disabled={!allAnswered}>
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
