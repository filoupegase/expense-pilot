import { z } from "zod";
import * as shema from "./schema";
import app from "./app";

export type ApiRoutes = typeof app;

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};

export const createExpenseSchema = shema.insertExpensesSchema
  .pick({
    title: true,
    amount: true,
    content: true,
  })
  .refine((data) => data.amount || data.content, {
    message: "Either Amount or Content must be provided",
    path: ["amount", "content"],
  });

export type CreateExpense = z.infer<typeof createExpenseSchema>;
