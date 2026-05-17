# Repo map (monorepo — for agents)

**Hub document.** Agents working inside one app should also read that app's `AGENTS.md` (e.g. `apps/web/AGENTS.md`) for local rules and commands.

## Purpose

<!-- One paragraph: the product/system across all workspaces -->

## Workspace layout

| Path | Package / name | Role | Local agent brief |
|------|----------------|------|-------------------|
| `apps/web` | <!-- @acme/web --> | <!-- Frontend --> | [apps/web/AGENTS.md](../apps/web/AGENTS.md) |
| `apps/api` | <!-- @acme/api --> | <!-- API --> | [apps/api/AGENTS.md](../apps/api/AGENTS.md) |
| `packages/ui` | <!-- --> | <!-- Shared UI --> | <!-- link if AGENTS.md exists, else "—" --> |

## How workspaces relate

```text
<!-- optional ASCII: web → api → db, shared packages -->
```

## Shared vs app-only

| Area | Shared packages | App-only |
|------|-----------------|----------|
| Types / utils | `packages/shared` | — |
| UI primitives | `packages/ui` | `apps/web` features |

## Root entry points

- **Orchestration:** <!-- turbo / nx / pnpm -w -->
- **CI:** <!-- .github/workflows/ — what runs on PR -->

## Domain contexts

<!-- single CONTEXT.md at root -->
- Global domain: [CONTEXT.md](../CONTEXT.md)

<!-- OR multi-context -->
- Context index: [CONTEXT-MAP.md](../CONTEXT-MAP.md)

## Where not to look first

<!-- `dist/`, `node_modules/`, generated clients, etc. -->

## Related docs

- Commands: [commands.md](./commands.md)
- ADRs: `docs/adr/` (system-wide) and per-app `docs/adr/` if present
