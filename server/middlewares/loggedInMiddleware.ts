import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

import type { AuthContext } from "../lib/create-app";

export const loggedInMiddleware = createMiddleware<AuthContext>(async (c, next) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  await next();
});
