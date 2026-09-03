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

type Answers = Record<string, number>;
type FieldAnswers = Record<string, string | string[]>;
type OtherValues = Record<string, string>;
type Step = "business" | "assessment" | "support" | "result";

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
                value={typeof answers[field.id] === "string" ? (answers[field.id] as string) : ""}
                onChange={(e) => handlers.setText(field.id, e.target.value)}
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
  const [step, setStep] = useState<Step>("business");

  useEffect(() => {
    if (!window.history.state || window.history.state.assessmentStep === undefined) {
      window.history.replaceState({ assessmentStep: "business" }, "");
    }

    function onPopState(event: PopStateEvent) {
      const nextStep = (event.state?.assessmentStep as Step | undefined) ?? "business";
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
  const level = getReadinessLevel(totalScore);
  const companyName = typeof business.companyName === "string" ? business.companyName : "";

  function selectAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
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
    goToStep("result");
  }

  function resetAll() {
    setStep("business");
    window.history.replaceState({ assessmentStep: "business" }, "");
    setBusiness({});
    setBusinessOther({});
    setProfile({});
    setProfileOther({});
    setSupport({});
    setSupportOther({});
    setAnswers({});
  }

  if (step === "result") {
    return (
      <div className="assessment-result">
        <p className="assessment-result__label">Kết quả đánh giá</p>
        <div className="assessment-result__score">
          <strong>{totalScore}</strong>
          <span>/ 100 điểm</span>
        </div>
        <p className="assessment-result__level">
          {companyName ? `${companyName} — ${level.label}` : level.label}
        </p>
        <p className="assessment-result__desc">{level.desc}</p>

        <div className="score-list assessment-result__breakdown">
          {categoryScores.map((c) => (
            <div className="score-row" key={c.category}>
              <span>{c.category}</span>
              <div className="score-row__bar">
                <i style={{ width: `${(c.score / c.max) * 100}%` }} />
              </div>
              <strong>
                {c.score}/{c.max}
              </strong>
            </div>
          ))}
        </div>

        <div className="assessment-result__actions">
          <button type="button" className="button button--ghost" onClick={resetAll}>
            Làm lại đánh giá
          </button>
          <a className="button button--primary" href="/events">
            Xem chương trình phù hợp
          </a>
        </div>
      </div>
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
          <button type="button" className="button button--ghost" onClick={goBack}>
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
        <button type="button" className="button button--ghost" onClick={goBack}>
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
