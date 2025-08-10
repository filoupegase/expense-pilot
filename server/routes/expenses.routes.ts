import { Hono } from "hono";
import { db } from "../../db/db";
import { expenses as expenseTable } from "../../db/schema";
//import { insertExpensesSchema } from "../schema";
import { eq, desc } from "drizzle-orm";
import type { AuthType } from "../lib/create-app";
import { createExpenseValidator } from "../validators/create-expense.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import type { SuccessResponse } from "@/sharedTypes";

export const expensesRoutes = new Hono<AuthType>()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");

    const expensesQuery = db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .orderBy(desc(expenseTable.createdAt))
      .limit(100);

    const expenses = await expensesQuery;

    return c.json({ expenses });
  })
  .post("/", createExpenseValidator, async (c) => {
    const { amount, title, content } = c.req.valid("form");
    const user = c.get("user");

    const [expense] = await db
      .insert(expenseTable)
      .values({
        title,
        amount,
        content,
        userId: user.id,
      })
      .returning({
        id: expenseTable.id,
      });

    return c.json<SuccessResponse<{ expenseId: number }>>(
      {
        success: true,
        message: "Expense created",
        data: { expenseId: expense.id },
      },
      201,
    );
  });

// expensesRoutes.get("/total-spent", getUser, async (c) => {
//   const user = c.var.user;
//
//   const result = await db
//     .select({ total: sum(expenseTable.amount) })
//     .from(expenseTable)
//     .where(eq(expenseTable.userId, user.id))
//     .limit(1)
//     .then((res) => res[0]);
//
//   // const total = fakeExpenses.reduce(
//   //   (sum, expense) =>
//   //     sum + +expense.amount, 0
//   // );
//
//   return c.json(result);
// });
// expensesRoutes.get("/:id{[0-9]+}", getUser, async (c) => {
//   const id = Number.parseInt(c.req.param("id"));
//   const user = c.var.user;
//
//   const expense = await db
//     .select()
//     .from(expenseTable)
//     .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
//     .then((res) => res[0]);
//
//   if (!expense) {
//     return c.notFound();
//   }
//
//   // const expense = fakeExpenses.find(x => x.id === id);
//
//   return c.json({ expense });
// });
//
// expensesRoutes.delete("/:id{[0-9]+}", getUser, async (c) => {
//   const id = Number.parseInt(c.req.param("id"));
//   const user = c.var.user;
//
//   const expense = await db
//     .delete(expenseTable)
//     .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
//     .returning()
//     .then((res) => res[0]);
//
//   if (!expense) {
//     return c.notFound();
//   }
//
//   //const index = fakeExpenses.findIndex(expense => expense.id === id);
//   // if (index === -1) {
//   //   return c.notFound();
//   // }
//   //const deletedExpense = fakeExpenses.splice(index, 1)[0];}
//
//   return c.json({ expense });
// });

const createExpense = (id: number, title: string, amount: string) => ({
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
