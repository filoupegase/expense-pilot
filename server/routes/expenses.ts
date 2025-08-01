import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createExpensesSchema } from "../sharedTypes.ts";
import { getUser } from "../kinde";
import { db } from "../db";
import {
  expenses as expensesTable,
  type selectExpensesSchema as Expense,
} from "../db/schema/expenses.ts";
import { eq } from "drizzle-orm";

export const expensesRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.get("user");

    const res = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

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
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find(x => x.id === id);
    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex(expense => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense: deletedExpense });
  })
  .get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce(
      (sum, expense) =>
        sum + +expense.amount, 0
    );

    return c.json({ total });
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
