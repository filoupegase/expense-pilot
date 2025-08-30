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
    const res = await client.expenses.$post({
      form: {
        title,
        amount,
        content,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;
    return data;
  } catch (e) {
    return {
      success: false,
      error: String(e),
      isFormError: false,
    } as ErrorResponse;
  }
};

export async function getCurrentUser() {
  const res = await client.me.$get();

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return null;
}

export async function deleteExpense({ id }: { id: number }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const res = await client.expenses[":id"].$delete({
    param: { id: id.toString() },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
  const data = (await res.json()) as unknown as ErrorResponse;
  throw new Error(data.error);
}
