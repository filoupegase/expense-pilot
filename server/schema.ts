import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { expenses } from "../db/schema.ts";

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be a valid monetary value" })
});

// Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
