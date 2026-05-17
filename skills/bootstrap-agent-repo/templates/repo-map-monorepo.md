# Repo map (monorepo — for agents)

**Hub document.** Workspace-specific detail lives under **`docs/apps/`** and **`docs/packages/`** — not inside `apps/*` source trees.

## Purpose

<!-- One paragraph: the product/system across all workspaces -->

## Workspaces

| Code path | Docs | Role |
|-----------|------|------|
| `apps/web` | [docs/apps/web/README.md](../apps/web/README.md) | <!-- Frontend --> |
| `apps/api` | [docs/apps/api/README.md](../apps/api/README.md) | <!-- API --> |
| `packages/ui` | [docs/packages/ui/README.md](../packages/ui/README.md) | <!-- Shared UI --> |
| `packages/shared` | [docs/packages/shared/README.md](../packages/shared/README.md) | <!-- Shared types/utils --> |

- App index: [docs/apps/README.md](../apps/README.md)
- Package index: [docs/packages/README.md](../packages/README.md)

## How workspaces relate

```text
<!-- optional: web → api → db; packages consumed by apps -->
```

## Root entry points

- **Orchestration:** <!-- turbo / nx / pnpm -w -->
- **CI:** <!-- .github/workflows/ -->

## Domain contexts

<!-- single -->
- [CONTEXT.md](../../CONTEXT.md)

<!-- multi -->
- [CONTEXT-MAP.md](../../CONTEXT-MAP.md)

## Where not to look first

<!-- dist/, node_modules/, generated output -->

## Related docs

- Commands: [commands.md](./commands.md)
- ADRs: `docs/adr/`
