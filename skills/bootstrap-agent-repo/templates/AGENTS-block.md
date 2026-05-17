## For AI agents

**Start here (root):** read `docs/agents/repo-map.md` and `docs/agents/commands.md` before editing code.

**Working in one app?** Also read that app's `AGENTS.md` (e.g. `apps/web/AGENTS.md`) after the root map — local layout, filters, and app rules live there.

### Repo

- **Shape:** <!-- single app | monorepo -->
- **Stack:** <!-- e.g. Bun + Elysia API, React + Vite web -->
- **Workspaces:** <!-- e.g. `apps/*`, `packages/*` — or primary tree for single app -->
- **Run dev:** see `docs/agents/commands.md`

### Rules

- Match existing patterns in the tree you touch; no drive-by refactors.
- Run the relevant test command before claiming done (see `docs/agents/commands.md`).
- Spec or large behavior changes: get explicit approval before wide implementation.

### Domain language

<!-- single-context -->
See `CONTEXT.md` and `docs/adr/` for terminology and architectural decisions.

<!-- multi-context: replace above with -->
See `CONTEXT-MAP.md` for bounded contexts; each context has its own `CONTEXT.md` and may have `docs/adr/`.

### Agent skills (engineering workflow)

<!-- If setup-matt-pocock-skills was run, keep this subsection; else omit or add after setup -->
Issue tracker, triage labels, and domain layout: see `docs/agents/issue-tracker.md`, `triage-labels.md`, `domain.md`.

### Optional agent pack

<!-- If symlinked from isa/agentic or similar -->
- Agent prompts: <!-- path, e.g. ~/.config/opencode/agents → agentic/agents -->
- Skills: <!-- path -->
