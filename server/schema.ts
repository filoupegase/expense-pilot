import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { expenses } from "../db/schema";

export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters"
    }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid monetary value"
    })
    .optional(),
  content: z.string().optional(),
});
