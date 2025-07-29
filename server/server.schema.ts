import { z } from "zod";

const ServeEnv = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, "Port must be a numeric string")
    .default("3000")
    .transform(Number),
});

export const ProcessEnv = ServeEnv.parse(process.env);
