import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { serveStatic } from "hono/bun";
import { expensesRoutes } from "./routes/expenses.routes";

export type ApiRoutes = typeof apiRoutes;

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api")
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .route("/expenses", expensesRoutes)
  .get("/test", (c) => {
    return c.text("Hello Hono (second times) !");
  });

app.use("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
