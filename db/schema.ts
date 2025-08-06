import { uuid, pgTable, text, varchar, numeric, index, timestamp, date } from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    title: varchar({ length: 500 }).notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date").notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow(),
  },
  (expenses) => [
    index("email_idx").on(expenses.userId)
  ]
);
