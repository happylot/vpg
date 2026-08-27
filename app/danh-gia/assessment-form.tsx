"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  assessmentQuestions,
  getReadinessLevel,
  type AssessmentQuestion,
} from "./questions";

type Answers = Record<string, number>;

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

export function AssessmentForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const groups = useMemo(() => groupByCategory(assessmentQuestions), []);
  const totalQuestions = assessmentQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const categoryScores = useMemo(() => {
    return groups.map((group) => {
      const score = group.questions.reduce(
        (sum, q) => sum + (answers[q.id] ?? 0),
        0,
      );
      return { category: group.category, max: group.categoryMax, score };
    });
  }, [groups, answers]);

  const totalScore = categoryScores.reduce((sum, c) => sum + c.score, 0);
  const level = getReadinessLevel(totalScore);

  function selectAnswer(questionId: string, points: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="assessment-result">
        <p className="assessment-result__label">Kết quả đánh giá</p>
        <div className="assessment-result__score">
          <strong>{totalScore}</strong>
          <span>/ 100 điểm</span>
        </div>
        <p className="assessment-result__level">{level.label}</p>
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
          <button
            type="button"
            className="button button--ghost"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
          >
            Làm lại đánh giá
          </button>
          <a className="button button--primary" href="/events">
            Xem chương trình phù hợp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="assessment-form" onSubmit={handleSubmit}>
      {groups.map((group) => (
        <div className="assessment-group" key={group.category}>
          <div className="assessment-group__head">
            <h3>{group.category}</h3>
            <span>{group.categoryMax} điểm</span>
          </div>

          {group.questions.map((question) => (
            <fieldset className="assessment-question" key={question.id}>
              <legend>
                Câu {assessmentQuestions.indexOf(question) + 1}.{" "}
                {question.text}
              </legend>
              <div className="assessment-options">
                {question.options.map((option) => (
                  <label className="assessment-option" key={option.label}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.points}
                      checked={answers[question.id] === option.points}
                      onChange={() => selectAnswer(question.id, option.points)}
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
        <p>
          Đã trả lời {answeredCount}/{totalQuestions} câu hỏi
        </p>
        <button
          type="submit"
          className="button button--primary"
          disabled={!allAnswered}
        >
          Xem kết quả đánh giá
        </button>
      </div>
    </form>
  );
}
