import { z } from "zod";
import * as shema from "../server/schema";

export type { ApiRoutes } from "../server/app";

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

export type Expense = {
  id: number;
  userId: string;
  title: string;
  amount: string | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null | undefined
}

export type TotalExpenses = {
  total: string;
};
