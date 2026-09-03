import { assessmentResultsTableSql, withDb } from "../../../../db";
import { assessmentResults } from "../../../../db/schema";
import {
  assessmentQuestionsBranch1,
  assessmentQuestionsBranch2,
  branch2ProfileFields,
  businessInfoFields,
  getReadinessLevel,
  supportFields,
  type BusinessField,
} from "../../../danh-gia/questions";

type FieldValues = Record<string, string | string[] | undefined>;

function fieldValueToText(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
}

function buildEntries(fields: BusinessField[], values: FieldValues) {
  return fields.map((field) => ({
    label: field.label,
    value: fieldValueToText(values[field.id]),
  }));
}

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const cause = error instanceof Error && error.cause instanceof Error ? error.cause : undefined;
  const causeMessage = cause?.message ?? "";
  const combined = `${message}\n${causeMessage}`;

  if (combined.includes("Postgres connection env vars are missing")) {
    return "Chưa cấu hình kết nối Postgres. Kiểm tra DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD trong .dev.vars.";
  }

  if (
    combined.includes("ECONNREFUSED") ||
    combined.includes("Connection terminated") ||
    combined.includes("timeout")
  ) {
    return "Không kết nối được tới Postgres. Kiểm tra Postgres đã chạy và chấp nhận kết nối chưa.";
  }

  return causeMessage || message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      business?: FieldValues;
      branch?: string;
      profile?: FieldValues;
      answers?: Record<string, number>;
      support?: FieldValues;
    };

    const business = payload.business ?? {};
    const branch = payload.branch === "branch2" ? "branch2" : "branch1";
    const profile = payload.profile ?? {};
    const answers = payload.answers ?? {};
    const support = payload.support ?? {};

    const companyName = fieldValueToText(business.companyName).trim();
    const contactName = fieldValueToText(business.contactName).trim();
    const phone = fieldValueToText(business.phone).trim();
    const email = fieldValueToText(business.email).trim();

    if (!companyName || !phone) {
      return Response.json({ error: "Thiếu tên doanh nghiệp hoặc số điện thoại." }, { status: 400 });
    }

    const scoredQuestions = branch === "branch1" ? assessmentQuestionsBranch1 : assessmentQuestionsBranch2;

    const categoryOrder: string[] = [];
    const categoryTotals = new Map<string, { category: string; max: number; score: number }>();

    const scoredEntries = scoredQuestions.map((question) => {
      const optionIndex = answers[question.id];
      const option = typeof optionIndex === "number" ? question.options[optionIndex] : undefined;
      const points = option?.points ?? 0;

      if (!categoryTotals.has(question.category)) {
        categoryOrder.push(question.category);
        categoryTotals.set(question.category, {
          category: question.category,
          max: question.categoryMax,
          score: 0,
        });
      }
      categoryTotals.get(question.category)!.score += points;

      return {
        category: question.category,
        question: question.text,
        selected: option?.label ?? "(chưa trả lời)",
        points,
      };
    });

    const categoryScores = categoryOrder.map((category) => categoryTotals.get(category)!);
    const totalScore = categoryScores.reduce((sum, c) => sum + c.score, 0);
    const level = getReadinessLevel(totalScore);

    const businessEntries = buildEntries(businessInfoFields, business);
    const profileEntries = branch === "branch2" ? buildEntries(branch2ProfileFields, profile) : null;
    const supportEntries = buildEntries(supportFields, support);

    const saved = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentResultsTableSql);
      const [row] = await db
        .insert(assessmentResults)
        .values({
          companyName,
          contactName,
          phone,
          email,
          branch,
          totalScore,
          levelLabel: level.label,
          businessEntries,
          profileEntries,
          scoredEntries,
          categoryScores,
          supportEntries,
        })
        .returning();
      return row;
    });

    return Response.json({ result: saved }, { status: 201 });
  } catch (error) {
    console.error("Lưu kết quả đánh giá thất bại:", error);
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
