---
name: drizzle-orm
description: Expert in Drizzle ORM for PostgreSQL with TypeScript. Use when working with database schemas, queries, migrations, or Drizzle configuration.
---

This skill provides deep knowledge of Drizzle ORM for PostgreSQL.

## Overview

Drizzle is a lightweight, TypeScript-first ORM that gives you full control over your SQL. It works with PostgreSQL, MySQL, and SQLite.

## Project Detection

This skill activates when:
- A `drizzle.config.ts` or `drizzle.json` file exists
- A `src/db/schema.ts` or similar schema file exists
- Package `drizzle-orm` is in dependencies

## Schema Definition

### Basic Table

```typescript
import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: text('role').default('user'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
```

### With Relations

```typescript
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  userId: integer('user_id').references(() => users.id),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}))
```

### Enums

```typescript
import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['admin', 'user', 'guest'])

export const users = pgTable('users', {
  role: roleEnum('role').default('user'),
})
```

## Queries

### Select

```typescript
import { db } from './db'
import { users } from './schema'

// All users
const allUsers = await db.select().from(users)

// With where
const activeUsers = await db
  .select()
  .from(users)
  .where(eq(users.isActive, true))

// With join
const usersWithPosts = await db
  .select({
    user: users,
    postCount: sql<number>`count(${posts.id})`,
  })
  .from(users)
  .leftJoin(posts, eq(users.id, posts.userId))
  .groupBy(users.id)

// Single row
const user = await db.query.users.findFirst({
  where: eq(users.email, 'test@example.com'),
})
```

### Insert

```typescript
// Single insert
const [newUser] = await db
  .insert(users)
  .values({
    email: 'test@example.com',
    name: 'Test User',
  })
  .returning()

// Multiple insert
const newUsers = await db
  .insert(users)
  .values([
    { email: 'a@test.com', name: 'A' },
    { email: 'b@test.com', name: 'B' },
  ])
  .returning()
```

### Update

```typescript
const updated = await db
  .update(users)
  .set({ name: 'Updated Name', updatedAt: new Date() })
  .where(eq(users.id, 1))
  .returning()
```

### Delete

```typescript
const deleted = await db
  .delete(users)
  .where(eq(users.id, 1))
  .returning()
```

## Migrations

### Generate

```bash
pnpm db:generate
# or
drizzle-kit generate
```

### Push (dev)

```bash
pnpm db:push
# or
drizzle-kit push
```

### Migrate (prod)

```bash
pnpm db:migrate
# or
drizzle-kit migrate
```

## Drizzle Kit (CLI)

### drizzle.config.ts

```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### Common Commands

```bash
# Generate migration
drizzle-kit generate:sql

# Pull schema from DB
drizzle-kit pull

# Push schema to DB
drizzle-kit push

# Studio (GUI)
drizzle-kit studio
```

## Best Practices

### 1. Always use `$inferSelect` and `$inferInsert` for types

```typescript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
```

### 2. Use relations() for relationships

```typescript
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))
```

### 3. Use sql`` for custom expressions

```typescript
import { sql } from 'drizzle-orm'

const count = await db
  .select({ count: sql<number>`count(*)` })
  .from(users)
```

### 4. Use index for frequently queried columns

```typescript
export const users = pgTable('users', {
  // ...
  email: text('email').notNull().unique(), // unique creates index
})
```

## Troubleshooting

### "relation does not exist"
Run `pnpm db:push` to sync schema

### Type errors with infer
Make sure you're using the correct table reference

### Connection issues
Check DATABASE_URL in .env

## Resources

- [Drizzle Docs](https://orm.drizzle.team/)
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)
- [PostgreSQL Schema](https://orm.drizzle.team/docs/postgres-overview)