import { hc } from "hono/client";
import { type CreateExpense } from "../../../server/sharedTypes";
import type { ApiRoutes } from "../../../server/app";

export const { api } = hc<ApiRoutes>("/");

export async function createExpense({ value }: { value: CreateExpense }
): Promise<CreateExpense> {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) {
    throw new Error("Failed to create expense");
  }

  const newExpense = await res.json();
  return newExpense;
}
