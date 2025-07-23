import { z } from "zod";

const ExpenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string()
    .min(3, { message: "Title must be least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  amount: z.string().regex(/^d+(\.\d{1,2})?$/, { message: "Amount must be a valid monetary value" })
});

export type Expense = z.infer<typeof ExpenseSchema>

export const createExpensesSchema = ExpenseSchema.omit({
  id: true,
  // userId: true,
  // createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpensesSchema>;
