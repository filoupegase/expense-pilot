import app from "./app.ts";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  hostname: "127.0.0.1",
  fetch: app.fetch,
});

(() => console.log(`Listening on http://localhost:${server.port} ...`))();