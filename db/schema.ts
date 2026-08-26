import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const eventRegistrations = sqliteTable("event_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventSlug: text("event_slug").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  company: text("company").notNull().default(""),
  role: text("role").notNull().default(""),
  note: text("note").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
