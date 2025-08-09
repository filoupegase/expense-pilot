import { z } from "zod";
import * as shema from "./schema";
import app from "./app";

export type ApiRoutes = typeof app;

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};

export const createExpenseSchema = shema.insertExpensesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
