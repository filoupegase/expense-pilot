import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createExpensesSchema } from "../sharedTypes.ts";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses.ts";
import { eq, desc, sum, and } from "drizzle-orm";

export const expensesRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.get("user");

    const res = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({
      expenses: res,
      // expenses: [...fakeExpenses],
    });
  })
  .post("/", getUser, zValidator("json", createExpensesSchema), async (c) => {
    const expense = c.req.valid("json");

    const user = c.get("user");

    const result = await db
      .insert(expensesTable)
      .values({ ...expense, userId: user.id })
      .returning();

    //fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

    c.status(201);
    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(
        eq(expensesTable.userId, c.get("user").id), eq(expensesTable.id, id)))
      .then(res => res[0]);

    // const expense = fakeExpenses.find(x => x.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = await db
      .delete(expensesTable)
      .where(and(
        eq(expensesTable.userId, c.get("user").id), eq(expensesTable.id, id)))
      .returning()
      .then(res => res[0]);

    //const index = fakeExpenses.findIndex(expense => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    // if (index === -1) {
    //   return c.notFound();
    // }

    //const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense: expense });
  })
  .get("/total-spent", getUser, async (c) => {
    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.get("user").id))
      .limit(1)
      .then(res => res[0]);

    // const total = fakeExpenses.reduce(
    //   (sum, expense) =>
    //     sum + +expense.amount, 0
    // );

    return c.json(result);
  });

const createExpense = (id: number, title: string, amount: string) => ({
  id,
  title,
  amount,
});

const fakeExpenses = [
  createExpense(1, "Groceries", "50"),
  createExpense(2, "Utilities", "100"),
  createExpense(3, "Rent", "1200"),
];
