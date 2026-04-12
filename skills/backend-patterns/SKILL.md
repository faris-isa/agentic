---
name: backend-patterns
description: Reference for backend API patterns. Contains specific guides for Elysia (Bun), Hono (Node), and Gin (Go).
---

This skill contains backend patterns organized by runtime/framework:

## Available References

| File | Framework | Runtime | API Docs |
|------|-----------|--------|----------|
| `references/elysia.md` | Elysia | Bun | `/scalar` |
| `references/hono.md` | Hono | Node.js | `/docs` |
| `references/gin.md` | Gin | Go | `/swagger` |

## Usage

The skill will activate based on project type:
- `.env` with `DATABASE_URL` + TypeScript → Elysia or Hono
- `go.mod` → Gin
- Check for `drizzle.config.ts` → Drizzle integration

## Topics Covered

Each reference includes:
- Quick start
- Basic routes (GET, POST, PATCH, DELETE)
- Validation patterns
- OpenAPI/Swagger integration
- JWT authentication
- Error handling
- Middleware
- Best practices

## Choose the Right Reference

- **Bun/Elysia**: Fastest, built-in OpenAPI
- **Node/Hono**: Most mature ecosystem
- **Go/Gin**: Best for high-performance needs