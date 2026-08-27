import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventSlug: text("event_slug").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  company: text("company").notNull().default(""),
  role: text("role").notNull().default(""),
  note: text("note").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
