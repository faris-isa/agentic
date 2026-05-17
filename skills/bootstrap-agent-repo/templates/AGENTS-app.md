# <!-- apps/web or packages/api — display name -->

Local agent brief for **this workspace only**. The repo-wide map lives at the root — read that first.

**Upstream (always):**

- [docs/agents/repo-map.md](../../docs/agents/repo-map.md) — full monorepo map
- [docs/agents/commands.md](../../docs/agents/commands.md) — root and workspace commands
- Root [AGENTS.md](../../AGENTS.md) or [CLAUDE.md](../../CLAUDE.md) — global rules

<!-- If this app has its own CONTEXT.md -->
- [CONTEXT.md](./CONTEXT.md) — domain language for this app

## What this app is

<!-- 2–3 sentences -->

## Layout (this tree only)

| Path | Role |
|------|------|
| <!-- `src/routes` --> | <!-- --> |

## Commands (this workspace)

Run from **repo root** unless your package.json says otherwise:

```bash
# <!-- e.g. pnpm --filter @acme/web dev -->
# <!-- e.g. pnpm --filter @acme/web test -->
```

## App-specific rules

- <!-- e.g. all API changes need OpenAPI update -->
- <!-- e.g. UI uses design system in packages/ui -->

## Depends on (internal)

- <!-- `packages/shared`, `packages/ui` — what this app imports -->
