import { createMiddleware } from "hono/factory";
import { auth } from "@/server/lib/auth";
import type { AuthType } from "@/server/lib/create-app";

export const authMiddleware = createMiddleware<AuthType>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
