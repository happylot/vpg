import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventSlug: text("event_slug").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  company: text("company").notNull().default(""),
  role: text("role").notNull().default(""),
  note: text("note").notNull().default(""),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// A single { label, value } pair — one answered question/field, in display order.
export type AssessmentFieldEntry = { label: string; value: string };
// One scored question — category it belongs to, the question text, the chosen
// answer's label, and the points it earned.
export type AssessmentScoredEntry = {
  category: string;
  question: string;
  selected: string;
  points: number;
};
export type AssessmentCategoryScore = { category: string; max: number; score: number };
// AI-generated recommendation — one advice item per weak category, plus a
// short overall summary, and an AI-generated level label + one-sentence desc.
// Generated once at submit time and cached on the row.
export type AssessmentRecommendationItem = { category: string; advice: string };
export type AssessmentRecommendation = {
  levelLabel: string;
  levelDesc: string;
  summary: string;
  items: AssessmentRecommendationItem[];
};

export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  reportToken: text("report_token").notNull().default(""),
  companyName: text("company_name").notNull().default(""),
  contactName: text("contact_name").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  branch: text("branch").notNull().default("branch1"),
  totalScore: integer("total_score").notNull().default(0),
  levelLabel: text("level_label").notNull().default(""),
  businessEntries: jsonb("business_entries").notNull().$type<AssessmentFieldEntry[]>(),
  profileEntries: jsonb("profile_entries").$type<AssessmentFieldEntry[] | null>(),
  scoredEntries: jsonb("scored_entries").notNull().$type<AssessmentScoredEntry[]>(),
  categoryScores: jsonb("category_scores").notNull().$type<AssessmentCategoryScore[]>(),
  supportEntries: jsonb("support_entries").notNull().$type<AssessmentFieldEntry[]>(),
  aiRecommendation: jsonb("ai_recommendation").$type<AssessmentRecommendation | null>(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const partnerInquiries = pgTable("partner_inquiries", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull().default(""),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  productIndustry: text("product_industry").notNull().default(""),
  note: text("note").notNull().default(""),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// One chat session per assessment report. Created the first time the user
// sends a message after completing the assessment.
export const assessmentChatSessions = pgTable("assessment_chat_sessions", {
  id: serial("id").primaryKey(),
  reportToken: text("report_token").notNull().unique(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Each turn in a chat session — either from the user or the AI assistant.
export const assessmentChatMessages = pgTable("assessment_chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

