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

export async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}
