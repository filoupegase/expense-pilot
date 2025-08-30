import { Hono } from "hono";
import type { AuthContext } from "../lib/create-app";
import { loggedInMiddleware } from "@/middlewares/loggedInMiddleware.ts";
import type { SuccessResponse, User } from "@/shared/types";

export const authRoutes = new Hono<AuthContext>()
  .use("*", loggedInMiddleware)
  .get("/me", async (c) => {
    const user = c.get("user")!;
    return c.json<SuccessResponse<User>>({
      success: true,
      message: "User fetched",
      data: user,
    });
  });
