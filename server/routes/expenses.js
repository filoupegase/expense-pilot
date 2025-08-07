import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createExpenseSchema } from "../sharedTypes.ts";
import { getUser } from "../kinde";
import { db } from "../../db/db";
import { expenses as expenseTable } from "../../db/schema";
import { insertExpensesSchema } from "../schema";
import { eq, desc, sum, and } from "drizzle-orm";
export const expensesRoutes = new Hono()
    .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id))
        .orderBy(desc(expenseTable.createdAt))
        .limit(100);
    return c.json({
        expenses: expenses,
        // expenses: [...fakeExpenses],
    });
})
    .get("/total-spent", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
        .select({ total: sum(expenseTable.amount) })
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id))
        .limit(1)
        .then((res) => res[0]);
    // const total = fakeExpenses.reduce(
    //   (sum, expense) =>
    //     sum + +expense.amount, 0
    // );
    return c.json(result);
})
    .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;
    const expense = await db
        .select()
        .from(expenseTable)
        .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
        .then((res) => res[0]);
    if (!expense) {
        return c.notFound();
    }
    // const expense = fakeExpenses.find(x => x.id === id);
    return c.json({ expense });
})
    .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json");
    const user = c.var.user;
    const validatedExpense = insertExpensesSchema.parse({
        ...expense,
        userId: user.id,
    });
    const result = await db
        .insert(expenseTable)
        .values(validatedExpense)
        .returning()
        .then((res) => res[0]);
    //fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(result);
})
    .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;
    const expense = await db
        .delete(expenseTable)
        .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
        .returning()
        .then((res) => res[0]);
    if (!expense) {
        return c.notFound();
    }
    //const index = fakeExpenses.findIndex(expense => expense.id === id);
    // if (index === -1) {
    //   return c.notFound();
    // }
    //const deletedExpense = fakeExpenses.splice(index, 1)[0];}
    return c.json({ expense });
});
const createExpense = (id, title, amount) => ({
    id,
    title,
    amount,
});
// @ts-ignore
const fakeExpenses = [
    createExpense(1, "Groceries", "50"),
    createExpense(2, "Utilities", "100"),
    createExpense(3, "Rent", "1200"),
];
