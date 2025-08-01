import { z } from "zod";
import { insertExpensesSchema } from "./db/schema/expenses";

export const createExpensesSchema = insertExpensesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpensesSchema>;
