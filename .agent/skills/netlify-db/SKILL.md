---
name: netlify-db
description: Guide for using Netlify DB (managed Neon Postgres). Use when the project needs a relational database, structured data storage, SQL queries, or data that will grow over time. Covers provisioning, raw SQL via @netlify/neon, Drizzle ORM integration, migrations, and deploy preview branching. Also covers when to use Netlify Blobs instead.
---

# Netlify DB

Netlify DB provisions a managed Neon Postgres database automatically. No Neon account required.

## When to Use DB vs Blobs

**Use Netlify DB when:**

- Storing structured, relational data
- Data will grow over time
- Need queries, filtering, joins, or aggregations

**Use Netlify Blobs instead when:**

- Storing files (images, documents, exports)
- A handful of records with no growth expectation
- Simple key-value storage with no relational needs
- Want zero dependencies beyond `@netlify/blobs`

See the **netlify-blobs** skill for Blobs usage.

## Setup

```bash
npm install @netlify/neon
netlify db init    # Provisions database and sets up Drizzle ORM
```

Prerequisites: logged into Netlify CLI and site linked (`netlify link`).

## Raw SQL via @netlify/neon

`@netlify/neon` wraps `@neondatabase/serverless`. No connection string needed — it auto-configures.

```typescript
import { neon } from '@netlify/neon';
const sql = neon();

const users = await sql('SELECT * FROM users');
await sql('INSERT INTO users (name) VALUES ($1)', ['Jane']);
await sql('UPDATE users SET name = $1 WHERE id = $2', ['Jane', 1]);
await sql('DELETE FROM users WHERE id = $1', [1]);
```

## Drizzle ORM Integration

For most projects, use Drizzle ORM on top of Netlify DB.

### drizzle.config.ts

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: { url: process.env.NETLIFY_DATABASE_URL! },
  schema: './db/schema.ts',
  out: './migrations',
  migrations: { prefix: 'timestamp' }, // Avoids conflicts across branches
});
```

### db/index.ts

```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.NETLIFY_DATABASE_URL!);
export const db = drizzle(sql, { schema });
export * from './schema';
```

### Schema Example

```typescript
// db/schema.ts
import { integer, pgTable, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
```

### Query Patterns

```typescript
import { db, items } from '../db';
import { eq } from 'drizzle-orm';

const all = await db.select().from(items);
const [one] = await db.select().from(items).where(eq(items.id, id)).limit(1);
const [created] = await db.insert(items).values({ title: 'New' }).returning();
const [updated] = await db
  .update(items)
  .set({ title: 'Updated' })
  .where(eq(items.id, id))
  .returning();
await db.delete(items).where(eq(items.id, id));
```

## Migrations

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "netlify dev:exec drizzle-kit migrate",
    "db:push": "netlify dev:exec drizzle-kit push",
    "db:studio": "netlify dev:exec drizzle-kit studio"
  }
}
```

Workflow: modify schema, run `db:generate`, then `db:migrate`.

## Deploy Preview Branching

Netlify DB supports branching — production branch gets the production database, all other branches and deploy previews get a separate preview branch. Develop and test migrations on preview, merge to main, then apply to production.

## Environment Variables

- `NETLIFY_DATABASE_URL` — Auto-set by Netlify when database is provisioned
- Retrieve manually: `netlify env:get NETLIFY_DATABASE_URL`

## Local Development

Run `netlify dev` or use `@netlify/vite-plugin` to get database access locally. Use `netlify dev:exec` to run migration commands with the proper environment.
