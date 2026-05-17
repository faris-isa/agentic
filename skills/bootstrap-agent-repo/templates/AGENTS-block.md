## For AI agents

**Start here (root):** read `docs/agents/repo-map.md` and `docs/agents/commands.md` before editing code.

**Working in one workspace?** Read its README after the hub:

- App: `docs/apps/<slug>/README.md` (e.g. `docs/apps/web/README.md` for `apps/web`)
- Shared package: `docs/packages/<slug>/README.md` (e.g. `docs/packages/ui/README.md`)

Indexes: `docs/apps/README.md`, `docs/packages/README.md`.

### Repo

- **Shape:** <!-- single app | monorepo -->
- **Stack:** <!-- -->
- **Workspaces:** <!-- `apps/*`, `packages/*` -->
- **Run dev:** see `docs/agents/commands.md`

### Rules

- Match existing patterns in the tree you touch; no drive-by refactors.
- Run the relevant test command before claiming done (see `docs/agents/commands.md`).
- Spec or large behavior changes: get explicit approval before wide implementation.

### Domain language

<!-- single-context -->
See `CONTEXT.md` and `docs/adr/` for terminology and architectural decisions.

<!-- multi-context -->
See `CONTEXT-MAP.md` for bounded contexts; each context may have its own `CONTEXT.md` and `docs/adr/`.

### Agent skills (engineering workflow)

<!-- If setup-matt-pocock-skills was run -->
Issue tracker, triage labels, and domain layout: see `docs/agents/issue-tracker.md`, `triage-labels.md`, `domain.md`.

### Optional agent pack

<!-- If symlinked from isa/agentic or similar -->
- Agent prompts: <!-- path -->
- Skills: <!-- path -->
