import { Hono } from "hono";
import { db } from "../../db/db";
import { expenses as expenseTable } from "../../db/schema";
import { HTTPException } from "hono/http-exception";
//import { insertExpensesSchema } from "../schema";
import { eq, desc, and, sum } from "drizzle-orm";
import type { AuthContext } from "../lib/create-app";
import { createExpenseValidator } from "../validators/create-expense.validator";
import { loggedInMiddleware } from "../middlewares/loggedInMiddleware.ts";
import type { Expense, SuccessResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const expensesRoutes = new Hono<AuthContext>()
  .get("/", async (c) => {
    //const user = c.get("user");

    const expensesQuery = db
      .select({
        id: expenseTable.id,
        title: expenseTable.title,
        amount: expenseTable.amount,
      })
      .from(expenseTable)
      // .where(eq(expenseTable.userId, user.id)) // Uncomment this line when user context is available
      .orderBy(desc(expenseTable.createdAt))
      .limit(100);

    const expenses = await expensesQuery;

    return c.json<SuccessResponse<Expense[]>>(
      {
        data: expenses as Expense[],
        success: true,
        message: "Expense fetched successfully",
      },
      200,
    );
  })
  .post("/", loggedInMiddleware, createExpenseValidator(), async (c) => {
    const { amount, title, content } = c.req.valid("form");
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

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
        data: { expenseId: expense.id },
        success: true,
        message: "Expense created",
      },
      201,
    );
  })
  .get("/total-spent", loggedInMiddleware, async (c) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const result = await db
      .select({ total: sum(expenseTable.amount) })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);

    return c.json<SuccessResponse<{ total: string }>>(
      {
        data: { total: result.total || "0" },
        success: true,
        message: "Total amount fetched successfully",
      },
      200,
    );
  })
  .delete(
    "/:id",
    loggedInMiddleware,
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user");

      if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
      }

      const [expense] = await db
        .delete(expenseTable)
        .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
        .returning();

      if (!expense) {
        return c.notFound();
      }

      return c.json<SuccessResponse<Expense>>(
        {
          data: expense as Expense,
          success: true,
          message: "Expense as been deleted with success",
        },
        200,
      );
    });


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
