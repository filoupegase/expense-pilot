import { hc } from "hono/client";
export const client = hc("/");
export const getExpenses = async () => {
    const res = await client.expenses.$get();
    if (!res.ok) {
        const data = (await res.json());
        throw new Error(data.error);
    }
    const data = await res.json();
    return data;
};
export async function createExpense({ value }) {
    const res = await client.expenses.$post({ json: value });
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
export async function deleteExpense({ id }) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const res = await client.expenses[":id{[0-9]+}"].$delete({
        param: { id: id.toString() },
    });
    if (!res.ok) {
        throw new Error("server error");
    }
}
