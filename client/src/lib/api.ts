import { hc } from "hono/client";
import type { ErrorResponse, ApiRoutes } from "@/shared/types";

const client = hc<ApiRoutes>("", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: "include"
    });
  }
}).api;

export const getExpenses = async () => {
  const res = await client.expenses.$get();

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }

  const data = await res.json();
  return data;
};

export const expenseSubmit = async (title: string, amount: string, content: string) => {
  try {
    const res = await client.expenses.$post({ form: { title, amount, content } });

    const data = await res.json();
    return res.ok ? data : (data as ErrorResponse);
  } catch (error) {
    return { success: false, error: String(error), isFormError: false } as ErrorResponse;
  }
};

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
