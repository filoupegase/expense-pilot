import { db } from "../../db/db";
import { expenses as expenseTable } from "../../db/schema";
import { desc, eq } from "drizzle-orm";

export const getExpenses = async (userId: string) => {
  const expenses = await db
    .select()
    .from(expenseTable)
    .where(eq(expenseTable.userId, userId))
    .orderBy(desc(expenseTable.createdAt))
    .limit(100);

  return expenses;
};
