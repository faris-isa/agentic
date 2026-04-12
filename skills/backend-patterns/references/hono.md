---
name: hono-patterns
description: Reference for Hono.js (Node.js) backend patterns - API design, middleware, authentication, OpenAPI/Swagger.
---

# Hono Patterns (Node.js)

## Quick Start

```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/*', cors())

app.get('/', (c) => c.text('Hello Hono!'))

export default app
```

## Basic Routes

```typescript
// GET
app.get('/users', async (c) => {
  const users = await db.select().from(usersTable)
  return c.json(users)
})

// GET with params
app.get('/users/:id', async (c) => {
  const id = c.req.param('id')
  const user = await db.query.users.findFirst({
    where: eq(usersTable.id, Number(id)),
  })
  if (!user) return c.json({ error: 'Not found' }, 404)
  return c.json(user)
})

// POST
app.post('/users', async (c) => {
  const body = await c.req.json()
  const [user] = await db.insert(usersTable).values(body).returning()
  return c.json(user, 201)
})

// PATCH
app.patch('/users/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const [user] = await db.update(usersTable)
    .set(body)
    .where(eq(usersTable.id, Number(id)))
    .returning()
  return c.json(user)
})

// DELETE
app.delete('/users/:id', async (c) => {
  const id = c.req.param('id')
  await db.delete(usersTable).where(eq(usersTable.id, Number(id)))
  return c.json({ success: true })
})
```

## Validation (Zod)

### Basic Validation

```typescript
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
})

app.post('/users', zValidator('json', createUserSchema), async (c) => {
  const body = c.req.valid('json')
  // body is typed as { email: string; name: string }
})
```

### Advanced Validation with Defaults & Refinement

```typescript
import { z } from 'zod/mini'
import { zValidator } from '@hono/zod-validator'

// Schema with defaults
const AddressSchema = z.object({
  city: z.string(),
  zip: z._default(z.number(), 0),
  country: z._default(z.string(), 'USA'),
})

// Schema with cross-field refinement
const CreateOrderDto = z.object({
  items: z.array(z.number()).check(z.minLength(1)),
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),
}).check(
  z.refine((data) => {
    // Cross-field validation
    if (data.billingAddress && !data.shippingAddress) {
      return false
    }
    return true
  }, {
    message: 'Billing address requires shipping address',
  })
)

// Export validator
export const createOrderValidator = zValidator('json', CreateOrderDto)
export type CreateOrderDto = z.infer<typeof CreateOrderDto>

// Use in route
app.post('/orders', createOrderValidator, async (c) => {
  const order = c.req.valid('json')
  // order is fully typed
})
```

### Validation with Enums

```typescript
import { z } from 'zod/mini'

const UnitEnum = z.enum(['BAG_PER_MINUTE', 'SAK_PER_MINUTE', 'PCS_PER_MINUTE'])

const ProductSchema = z.object({
  name: z.string().check(z.minLength(1)),
  price: z.number(),
  unit: UnitEnum,
  quantity: z.number().check(z.gt(0)),
})

app.post('/products', zValidator('json', ProductSchema), async (c) => {
  const product = c.req.valid('json')
})
```

### Query/Param Validation

```typescript
const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  sort: z.enum(['asc', 'desc']).optional(),
})

app.get('/users', zValidator('query', paginationSchema), async (c) => {
  const { page, limit, sort } = c.req.valid('query')
  // page, limit are numbers now (coerced)
})
```

## OpenAPI + Swagger

```typescript
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import swagger from '@hono/swagger'

const app = new OpenAPIHono()

app.use('/*', cors())

// Swagger UI
app.get('/docs', swagger({ route: '/openapi.json' }))
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: { title: 'My API', version: '1.0.0' },
})

// Typed route
const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List all users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(UserSchema),
        },
      },
    },
  },
})

app.openapi(getUsersRoute, async (c) => {
  const users = await db.select().from(usersTable)
  return c.json(users)
})
```

Access: `http://localhost:3000/docs`

## JWT Auth

```typescript
import { verify } from 'hono/jwt'

const jwtAuth = mw<{ Variables: { user: JWTPayload } }>(async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1]
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  
  const payload = await verify(token, JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)
  
  c.set('user', payload)
  await next()
})

// Protected route
app.get('/profile', jwtAuth, async (c) => {
  const user = c.get('user')
  return c.json(user)
})
```

## Error Handling

```typescript
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.response
  }
  console.error(err)
  return c.json({ error: err.message }, 500)
})
```

## Middleware

```typescript
// Global
app.use(async (c, next) => {
  console.log(c.req.path)
  await next()
})

// Path-specific
app.use('/api/*', cors())

// Grouped
const api = app.basePath('/api')
api.get('/users', ...)
```

## Best Practices

- Use `OpenAPIHono` for typed routes
- Use Zod for validation
- Add `tags` and `summary` for docs
- Use proper HTTP status codes

## Resources

- [Hono Docs](https://hono.dev/)
- [zod-openapi](https://github.com/honojs/middleware/tree/main/zod-openapi)