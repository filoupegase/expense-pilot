import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createExpenseSchema, type Expense } from "../sharedTypes.ts";

const createExpense = (id: number, title: string, amount: string): Expense => ({
  id,
  title,
  amount,
});

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    // await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a delay
    return c.json({
      expenses: [...fakeExpenses],
    });
  })
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);

    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find(x => x.id === id);
    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex(expense => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense: deletedExpense });
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce((sum, expense) => sum + expense.amount, "0");

    return c.json({ total });
  });

const fakeExpenses: Expense[] = [
  createExpense(1, "Groceries", "50"),
  createExpense(2, "Utilities", "100"),
  createExpense(3, "Rent", "1200"),
];
