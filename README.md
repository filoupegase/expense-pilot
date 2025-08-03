# expense-pilot

🧾 Expense tracking monorepo pilot - fullstack testing ground for personal finance features

## Installation

Install all dependencies:

```bash
bun install
```

## Database Migrations (Drizzle)

### Development Workflow

1. **Generate migrations** after schema changes:
   ```bash
   bunx drizzle-kit generate
   ```

2. **Apply migrations** to your database:
   ```bash
   bun migrate.ts
   ```

3. **Open Drizzle Studio** for database inspection:
   ```bash
   bunx drizzle-kit studio
   ```

### Migration Commands Reference

| Command                     | Description                                     |
|-----------------------------|-------------------------------------------------|
| `bunx drizzle-kit generate` | Generate migration files from schema changes    |
| `bun migrate.ts`            | Execute pending migrations against the database |
| `bunx drizzle-kit studio`   | Launch the web-based database browser           |

## Getting Started

1. Install dependencies: `bun install`
2. Generate initial migrations: `bunx drizzle-kit generate`
3. Apply migrations: `bun migrate.ts`
4. Start development with Drizzle Studio: `bunx drizzle-kit studio`
