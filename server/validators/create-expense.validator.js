import { zValidator } from "@hono/zod-validator";
import { createExpenseSchema } from "../sharedTypes";
export const createExpenseValidator = zValidator("json", createExpenseSchema, (result, c) => {
    if (!result.success) {
        return c.json({
            errors: result.error.issues.map((issue) => issue.message),
        }, 400);
    }
});
