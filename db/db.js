import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { z } from "zod";
import * as drizzleShema from "./schema";
const PostgresEnv = z.object({
    DATABASE_URL: z.string()
        .startsWith("postgres://")
        .or(z.string().startsWith("postgresql://")),
});
const ProcessEnv = PostgresEnv.parse(process.env);
export const pool = new Pool({
    connectionString: ProcessEnv.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
});
export const db = drizzle(pool, { schema: drizzleShema, casing: "snake_case" });
