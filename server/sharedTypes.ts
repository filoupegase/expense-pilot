import { z } from "zod";
import { insertExpensesSchema } from "./schema";

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
