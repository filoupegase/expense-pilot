import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

import type { AuthType } from "../lib/create-app";

export const loggedInMiddleware = createMiddleware<AuthType>(async (c, next) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  await next();
});
