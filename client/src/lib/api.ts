import { hc } from "hono/client";
import type { CreateExpense, ErrorResponse, ApiRoutes } from "@/server/sharedTypes";

const client = hc<ApiRoutes>("", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: "include"
    });
  }
});

export const getExpenses = async () => {
  const res = await client.api.expenses.$get();

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }

  const data = await res.json();
  return data;
};

export async function createExpense({ value }: { value: CreateExpense }) {
  const res = await client.api.expenses.$post({ json: value });

  if (!res.ok) {
    throw new Error("Failed to create expense");
  }

  const newExpense = await res.json();
  return newExpense;
}

export async function getCurrentUser() {
  const res = await client.me.$get();

  if (!res.ok) {
    throw new Error("server error");
  }

  const data = await res.json();
  return data;
}

export async function deleteExpense({ id }: { id: number }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const res = await client.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}
