---
name: elysia-patterns
description: Reference for Elysia.js (Bun) backend patterns - API design, middleware, authentication, OpenAPI/Scalar docs.
---

# Elysia Patterns (Bun)

## Quick Start

```typescript
import { Elysia, t } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Hello Elysia!')
  .listen(3000)
```

## Basic Routes

```typescript
// GET
app.get('/users', () => db.select().from(users))

// GET with params
app.get('/users/:id', ({ params: { id } }) => 
  db.query.users.findFirst({ where: eq(users.id, Number(id)) })
)

// POST
app.post('/users', ({ body }) => 
  db.insert(users).values(body).returning()
)

// PATCH
app.patch('/users/:id', ({ params: { id }, body }) =>
  db.update(users).set(body).where(eq(users.id, Number(id))).returning()
)

// DELETE
app.delete('/users/:id', ({ params: { id } }) =>
  db.delete(users).where(eq(users.id, Number(id)))
)
```

## Validation (built-in)

```typescript
app.post('/users', ({ body }) => {
  // body is typed automatically
}, {
  body: t.Object({
    email: t.String({ format: 'email' }),
    name: t.String({ minLength: 1, maxLength: 100 }),
    age: t.Number({ minimum: 0, maximum: 150 }),
  }),
})
```

## OpenAPI + Scalar Docs

```typescript
import { swagger } from '@elysiajs/swagger'

app.use(swagger({
  documentation: {
    info: { title: 'My API', version: '1.0.0' },
    tags: [{ name: 'Users', description: 'User endpoints' }],
  },
}))

// Add detail to routes
app.get('/users', () => db.select().from(users), {
  detail: { tags: ['Users'], summary: 'List users' },
})
```

Access: `http://localhost:3000/scalar`

## JWT Auth

```typescript
import { jwt } from '@elysiajs/jwt'

app.use(jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET!,
}))

// Protected route
app.get('/profile', ({ user }) => {
  if (!user) return { error: 'Unauthorized' }, 401
  return user
})

// Login endpoint
app.post('/login', async ({ body, jwt }) => {
  const { email, password } = body as any
  const user = await verifyPassword(email, password)
  return {
    token: await jwt.sign({ id: user.id, email: user.email }),
  }
})
```

## Error Handling

```typescript
app.onError(({ error }) => {
  console.error(error)
  return { error: 'Internal Server Error' }
})
```

## Middleware

```typescript
// Global
app.use(({ request, path }, next) => {
  console.log(`${request.method} ${path}`)
  return next()
})

// Grouped
app.group('/api', (app) => 
  app.get('/users', ...)
)
```

## Best Practices

- Use `t.Object()` for validation
- Add `detail` to every route for docs
- Use `listen()` for server start
- Store secrets in `.env`

## Resources

- [Elysia Docs](https://elysiajs.com/)
- [Scalar](https://scalar.com/)