import * as shema from "./schema";
export const createExpenseSchema = shema.insertExpensesSchema.omit({
    id: true,
    userId: true,
    createdAt: true,
});
