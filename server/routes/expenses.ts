import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const ExpenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof ExpenseSchema>

const createExpenseSchema = ExpenseSchema.omit({ id: true });

const makeFakeExpenses = (id: number, title: string, amount: number): Expense => ({
  id,
  title,
  amount,
});

const fakeExpenses: Expense[] = [
  makeFakeExpenses(1, "Groceries", 50),
  makeFakeExpenses(2, "Utilities", 100),
  makeFakeExpenses(3, "Rent", 1200),
];

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
    const total = fakeExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return c.json({ total });
  });