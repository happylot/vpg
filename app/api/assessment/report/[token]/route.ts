import fontkit from "@pdf-lib/fontkit";
import { eq } from "drizzle-orm";
import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";
import { assessmentResultsAlterSql, assessmentResultsTableSql, withDb } from "../../../../../db";
import { assessmentResults } from "../../../../../db/schema";
import { beVietnamProBoldBase64, beVietnamProRegularBase64 } from "./fonts";

type FieldEntry = { label: string; value: string };
type ScoredEntry = { category: string; question: string; selected: string; points: number };
type CategoryScore = { category: string; max: number; score: number };

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLOR_INK = rgb(0x21 / 255, 0x15 / 255, 0x13 / 255);
const COLOR_MUTED = rgb(0x6c / 255, 0x57 / 255, 0x50 / 255);
const COLOR_SCARLET = rgb(0xc5 / 255, 0x1d / 255, 0x18 / 255);
const COLOR_WINE = rgb(0x4c / 255, 0x03 / 255, 0x06 / 255);
const COLOR_LINE = rgb(0.92, 0.87, 0.85);
const COLOR_BAR_BG = rgb(0.94, 0.9, 0.88);

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function groupByCategory(entries: ScoredEntry[]) {
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

type DrawOptions = {
  size?: number;
  font?: PDFFont;
  color?: ReturnType<typeof rgb>;
  x?: number;
  maxWidth?: number;
  gap?: number;
};

async function buildReportPdf(row: typeof assessmentResults.$inferSelect) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  pdfDoc.setTitle(`Báo cáo đánh giá - ${row.companyName || "Vproud"}`);
  pdfDoc.setProducer("Vproud");

  const regularFont = await pdfDoc.embedFont(base64ToBytes(beVietnamProRegularBase64), { subset: true });
  const boldFont = await pdfDoc.embedFont(base64ToBytes(beVietnamProBoldBase64), { subset: true });

  let page: PDFPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  function newPage() {
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  }

  function ensureSpace(height: number) {
    if (y - height < MARGIN) newPage();
  }

  function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (current && font.widthOfTextAtSize(candidate, size) > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines.length > 0 ? lines : [""];
  }

  function drawLine(text: string, opts: DrawOptions = {}) {
    const size = opts.size ?? 10;
    const font = opts.font ?? regularFont;
    const color = opts.color ?? COLOR_INK;
    const x = opts.x ?? MARGIN;
    ensureSpace(size + 4);
    page.drawText(text, { x, y: y - size, size, font, color });
    y -= size + (opts.gap ?? 6);
  }

  function drawWrapped(text: string, opts: DrawOptions = {}) {
    const size = opts.size ?? 10;
    const font = opts.font ?? regularFont;
    const maxWidth = opts.maxWidth ?? CONTENT_WIDTH;
    const lines = wrapText(text, font, size, maxWidth);
    lines.forEach((line, index) => {
      drawLine(line, { ...opts, size, font, gap: index === lines.length - 1 ? opts.gap : 3 });
    });
  }

  function drawDivider() {
    ensureSpace(16);
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 0.6,
      color: COLOR_LINE,
    });
    y -= 16;
  }

  function drawSectionTitle(text: string) {
    ensureSpace(24);
    drawLine(text, { size: 11, font: boldFont, color: COLOR_WINE, gap: 10 });
  }

  function drawEntries(entries: FieldEntry[]) {
    for (const entry of entries) {
      drawWrapped(`${entry.label}: ${entry.value || "—"}`, { size: 9.5, gap: 6 });
    }
  }

  // ---- Header ----
  drawLine("BÁO CÁO ĐÁNH GIÁ SẴN SÀNG XUẤT KHẨU", { size: 9.5, font: boldFont, color: COLOR_SCARLET, gap: 6 });
  drawLine(row.companyName || "Doanh nghiệp", { size: 19, font: boldFont, color: COLOR_INK, gap: 4 });
  drawLine(`Lập ngày ${formatDate(row.createdAt)}`, { size: 9, color: COLOR_MUTED, gap: 18 });

  // ---- Score summary ----
  drawLine(`${row.totalScore} / 100 điểm`, { size: 22, font: boldFont, color: COLOR_INK, gap: 4 });
  drawLine(row.levelLabel, { size: 13, font: boldFont, color: COLOR_SCARLET, gap: 16 });

  // ---- Category breakdown with bars ----
  drawSectionTitle("ĐIỂM THEO TỪNG TIÊU CHÍ");
  const categoryScores = row.categoryScores as CategoryScore[];
  const barWidth = 190;
  const barX = PAGE_WIDTH - MARGIN - barWidth - 40;
  for (const c of categoryScores) {
    ensureSpace(24);
    const barY = y - 12;
    page.drawText(c.category, { x: MARGIN, y: y - 10, size: 9.5, font: regularFont, color: COLOR_INK });
    page.drawRectangle({ x: barX, y: barY, width: barWidth, height: 7, color: COLOR_BAR_BG });
    const ratio = c.max > 0 ? Math.max(0, Math.min(1, c.score / c.max)) : 0;
    if (ratio > 0) {
      page.drawRectangle({ x: barX, y: barY, width: barWidth * ratio, height: 7, color: COLOR_SCARLET });
    }
    page.drawText(`${c.score}/${c.max}`, {
      x: PAGE_WIDTH - MARGIN - 32,
      y: y - 10,
      size: 9.5,
      font: boldFont,
      color: COLOR_SCARLET,
    });
    y -= 22;
  }
  y -= 6;
  drawDivider();

  // ---- Section A ----
  drawSectionTitle("A — THÔNG TIN DOANH NGHIỆP");
  drawEntries(row.businessEntries as FieldEntry[]);
  y -= 6;
  drawDivider();

  // ---- Branch 2 profile (if any) ----
  if (row.profileEntries) {
    drawSectionTitle("HIỆN TRẠNG XUẤT KHẨU");
    drawEntries(row.profileEntries as FieldEntry[]);
    y -= 6;
    drawDivider();
  }

  // ---- Section B: grouped Q&A ----
  drawSectionTitle("B — CHI TIẾT TỪNG CÂU HỎI");
  const grouped = groupByCategory(row.scoredEntries as ScoredEntry[]);
  for (const group of grouped) {
    ensureSpace(18);
    drawLine(group.category, { size: 10, font: boldFont, color: COLOR_INK, gap: 6 });
    for (const entry of group.entries) {
      drawWrapped(entry.question, { size: 9.3, font: boldFont, color: COLOR_INK, gap: 2 });
      drawWrapped(`${entry.selected} (${entry.points} điểm)`, { size: 9.3, color: COLOR_MUTED, gap: 8 });
    }
    y -= 4;
  }
  drawDivider();

  // ---- Section C ----
  drawSectionTitle("C — NHU CẦU HỖ TRỢ");
  drawEntries(row.supportEntries as FieldEntry[]);

  return pdfDoc.save();
}

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  try {
    const row = await withDb(async ({ db, sql }) => {
      await sql.unsafe(assessmentResultsTableSql);
      await sql.unsafe(assessmentResultsAlterSql);
      const [result] = await db
        .select()
        .from(assessmentResults)
        .where(eq(assessmentResults.reportToken, token))
        .limit(1);
      return result;
    });

    if (!row) {
      return new Response("Không tìm thấy báo cáo.", { status: 404 });
    }

    const pdfBytes = await buildReportPdf(row);

    return new Response(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="bao-cao-danh-gia.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Không tạo được báo cáo PDF:", error);
    return new Response("Hiện chưa thể tạo báo cáo, vui lòng thử lại sau ít phút.", { status: 500 });
  }
}
