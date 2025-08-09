import { Hono } from "hono";
import { auth } from "./lib/auth";
import { serveStatic } from "hono/bun";
import { expensesRoutes } from "./routes/expenses.routes";
import { cors } from "hono/cors";
const app = new Hono().basePath("/api");
app.use("/api/auth/*", // or replace with "*" to enable cors for all routes
cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
}));
app
    .on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
    .route("/api/expenses", expensesRoutes)
    .get("/", (c) => {
    return c.text("Hello Hono!");
});
// app.on(["POST", "GET"], "/auth/*", (c) => {
//   return auth.handler(c.req.raw);
// });
//
// app.get("/session", (c) => {
//   const session = c.get("session");
//   const user = c.get("user");
//
//   if (!user) return c.body(null, 401);
//
//   return c.json({
//     session,
//     user
//   });
// });
//
// app.route("/expenses", expensesRoutes);
app.use("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));
export default app;
