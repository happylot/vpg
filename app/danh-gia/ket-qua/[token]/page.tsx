import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { assessmentResultsAlterSql, assessmentResultsTableSql, withDb } from "../../../../db";
import { assessmentResults } from "../../../../db/schema";
import { SiteNav } from "../../../components/site-nav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Báo cáo đánh giá sẵn sàng xuất khẩu | Vproud",
  robots: { index: false, follow: false },
};

type FieldEntry = { label: string; value: string };
type ScoredEntry = { category: string; question: string; selected: string; points: number };
type CategoryScore = { category: string; max: number; score: number };

function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function groupScoredByCategory(entries: ScoredEntry[]) {
  const groups: { category: string; entries: ScoredEntry[] }[] = [];
  for (const entry of entries) {
    let group = groups.find((g) => g.category === entry.category);
    if (!group) {
      group = { category: entry.category, entries: [] };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
}

function FieldEntryList({ entries }: { entries: FieldEntry[] }) {
  return (
    <dl className="assessment-answers__list">
      {entries.map((entry, i) => (
        <div className="assessment-answers__item" key={i}>
          <dt>{entry.label}</dt>
          <dd>{entry.value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function AssessmentReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let row;
  let loadError = "";
  try {
    row = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentResultsTableSql);
      await sql.unsafe(assessmentResultsAlterSql);
      const [result] = await db
        .select()
        .from(assessmentResults)
        .where(eq(assessmentResults.reportToken, token))
        .limit(1);
      return result;
    });
  } catch (error) {
    console.error("Không tải được báo cáo đánh giá:", error);
    loadError = "Hiện chưa thể tải báo cáo, vui lòng thử lại sau ít phút.";
  }

  if (!row) {
    return (
      <main>
        <section className="assessment-hero">
          <div className="hero__visual" aria-hidden="true" />
          <div className="hero__shade" aria-hidden="true" />
          <SiteNav variant="sub" />
          <div className="assessment-hero__content">
            <p className="kicker">Báo cáo đánh giá</p>
            <h1>{loadError ? "Không thể tải báo cáo" : "Không tìm thấy báo cáo"}</h1>
          </div>
        </section>
        <section className="section assessment-section">
          <div className="section__inner">
            <p className="admin-page__empty">
              {loadError || (
                <>
                  Đường dẫn báo cáo không hợp lệ hoặc đã hết hạn. Vui lòng làm lại bài đánh giá tại{" "}
                  <a href="/danh-gia">/danh-gia</a>.
                </>
              )}
            </p>
          </div>
        </section>
      </main>
    );
  }

  const categoryScores = row.categoryScores as CategoryScore[];
  const scoredGroups = groupScoredByCategory(row.scoredEntries as ScoredEntry[]);
  const businessEntries = row.businessEntries as FieldEntry[];
  const profileEntries = row.profileEntries as FieldEntry[] | null;
  const supportEntries = row.supportEntries as FieldEntry[];

  return (
    <main>
      <section className="assessment-hero">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <SiteNav variant="sub" />
        <div className="assessment-hero__content">
          <p className="kicker">Báo cáo đánh giá sẵn sàng xuất khẩu</p>
          <h1>{row.companyName || "Báo cáo đánh giá"}</h1>
          <p className="assessment-hero__lead">
            Lập ngày {formatDate(row.createdAt)} — toàn bộ câu trả lời và điểm số chi tiết của
            bài tự đánh giá.
          </p>
        </div>
      </section>

      <section className="section assessment-section">
        <div className="section__inner">
          <div className="assessment-result">
            <p className="assessment-result__label">Kết quả đánh giá</p>
            <div className="assessment-result__score">
              <strong>{row.totalScore}</strong>
              <span>/ 100 điểm</span>
            </div>
            <p className="assessment-result__level">
              {row.companyName ? `${row.companyName} — ${row.levelLabel}` : row.levelLabel}
            </p>

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

            <div className="assessment-answers">
              <div className="assessment-answers__section">
                <h4>A — Thông tin doanh nghiệp</h4>
                <FieldEntryList entries={businessEntries} />
              </div>

              {profileEntries && (
                <div className="assessment-answers__section">
                  <h4>Hiện trạng xuất khẩu</h4>
                  <FieldEntryList entries={profileEntries} />
                </div>
              )}

              <div className="assessment-answers__section">
                <h4>B — Chi tiết từng câu hỏi</h4>
                {scoredGroups.map((group) => (
                  <div className="assessment-answers__qa-group" key={group.category}>
                    <h5>
                      {group.category} —{" "}
                      {categoryScores.find((c) => c.category === group.category)?.score ?? 0}/
                      {categoryScores.find((c) => c.category === group.category)?.max ?? 0} điểm
                    </h5>
                    {group.entries.map((entry, i) => (
                      <div className="assessment-answers__qa" key={i}>
                        <p className="assessment-answers__question">{entry.question}</p>
                        <p className="assessment-answers__answer">
                          {entry.selected} <span>({entry.points} điểm)</span>
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="assessment-answers__section">
                <h4>C — Nhu cầu hỗ trợ</h4>
                <FieldEntryList entries={supportEntries} />
              </div>
            </div>

            <div className="assessment-result__actions">
              <a className="button button--ghost button--dark" href="/danh-gia">
                Làm lại đánh giá
              </a>
              <a className="button button--primary" href="/events">
                Xem chương trình phù hợp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
