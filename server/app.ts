import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { serveStatic } from "hono/bun";
//import { expensesRoutes } from "./routes/expenses";
// import { authRoute } from "./routes/auth.ts";

export type ApiRoutes = typeof apiRoutes;

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api");
//.route("/expenses", expensesRoutes);
// .route("/", authRoute);

app
  .on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
  .get("/", (c) => {
    return c.text("Hello Hono (second times) !");
  });


app.use("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
