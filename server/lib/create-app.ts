import type { Env } from "hono";

import { auth } from "./auth";

export interface AuthType extends Env {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}
