import { Hono } from "hono";
import { auth } from "./lib/auth";
import { serveStatic } from "hono/bun";
import { expensesRoutes } from "./routes/expenses.routes";
import { authRoutes } from "./routes/_auth.routes";
import { showRoutes } from "hono/dev";
import type { AuthContext } from "./lib/create-app";
import { cors } from "hono/cors";

const app = new Hono<AuthContext>()
  .use(
    "/api/auth/*", // or replace with "*" to enable cors for all routes
    cors({
      origin: "http://localhost:3000", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  );

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

const routes = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .get("/session", (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!user) return c.body(null, 401);

    return c.json({
      session,
      user
    });
  })
  .route("/expenses", expensesRoutes)
  .route("/", authRoutes);


showRoutes(app, {
  verbose: true,
});


app.use("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type ApiRoutes = typeof routes;
