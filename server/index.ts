import { app } from "./app";
import { ProcessEnv } from "./server.schema";

const server = Bun.serve({
  port: ProcessEnv.PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

(() => console.log(`Listening on http://localhost:${server.port} ...`))();
