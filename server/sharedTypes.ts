import { z } from "zod";
import * as shema from "./schema";

export const createExpenseSchema = shema.insertExpensesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
