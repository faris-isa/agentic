---
name: bootstrap-agent-repo
description: Onboard a large or existing codebase for AI agents by exploring the repo and writing or updating AGENTS.md, docs/agents/*.md, and an optional CONTEXT.md stub. Use when starting agent work on a new repo, missing agent docs, or user asks for AGENTS.md / agent onboarding / repo map for agents.
disable-model-invocation: true
---

# Bootstrap agent repo

Scaffold what agents need to work in **this** codebase without dumping everything into one giant prompt file.

**Relationship to other skills**

| Skill | When |
|-------|------|
| **This skill** | Repo map, commands, stack, `AGENTS.md` index, optional `CONTEXT.md` stub |
| **`setup-matt-pocock-skills`** (Matt) | Issue tracker, triage labels, domain-doc *layout* for engineering skills |
| **`zoom-out`** | Per-area map during a session (after bootstrap) |
| **`grill-with-docs`** | Stress-test a *plan* against `CONTEXT.md` / ADRs |

Run **this** first on a large unknown repo. Run **`setup-matt-pocock-skills`** when you use `triage`, `to-issues`, or `to-prd` on GitHub/GitLab issues.

## Principles

1. **`AGENTS.md` is an index** — roster, links, non-negotiables (~80–150 lines max). Not a dump of every module.
2. **`docs/agents/` is the detail** — repo map, commands, tracker/labels (via Matt setup), domain rules.
3. **Explore before writing** — read `package.json`, `go.mod`, `Makefile`, CI, existing docs; do not invent paths.
4. **One decision at a time** — present findings, then ask; do not dump a questionnaire.
5. **Edit the file that already exists** — `CLAUDE.md` if present, else `AGENTS.md`; never create both.

## Monorepo: hub at root, briefs under `apps/`

Use a **two-layer** layout when you have `apps/*` (or similar deployable workspaces):

| Layer | Location | Contents |
|-------|----------|----------|
| **Hub** | Root `AGENTS.md` + `docs/agents/repo-map.md` | Whole-repo map, workspace table, how apps connect, root/turbo/pnpm commands |
| **Spoke** | `apps/<name>/AGENTS.md` | That app only: local tree, `--filter` commands, app rules, internal package deps |

**Read order for an agent:** root map → root commands → **then** the `AGENTS.md` in the app you're editing.

- Prefer **`AGENTS.md`** (matches Cursor, Open Code, and this repo). Some teams use `agent.md`; if the project already standardises on that name, follow the repo — but do not duplicate the full repo map in every app file.
- Optional per-app **`CONTEXT.md`** when domain language differs per app; link from the app's `AGENTS.md`. System-wide terms stay in root `CONTEXT.md` or `CONTEXT-MAP.md`.
- **`packages/*`** usually do **not** need their own `AGENTS.md` unless they're large frameworks; mention them in the root map and in the consuming app's spoke file.

Templates: [repo-map-monorepo.md](templates/repo-map-monorepo.md), [AGENTS-app.md](templates/AGENTS-app.md).

## Process

### 1. Explore

Read what exists; note gaps:

- Root: `AGENTS.md`, `CLAUDE.md`, `README.md`, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`
- `docs/agents/` — prior bootstrap?
- Stack signals: `package.json`, `pnpm-workspace.yaml`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `docker-compose.yml`
- **Commands**: `scripts` in package.json, `Makefile`, CI workflows (`.github/workflows/`)
- **Entry points**: `src/`, `apps/`, `cmd/`, main server, API routes
- **Tests**: how to run unit/e2e (`test`, `vitest`, `pytest`, etc.)
- **Agent packs**: symlinks to external `agents/` or `.opencode/` (e.g. [isa agentic](https://github.com/faris-isa/agentic))

### 2. Present findings

Summarise: stack, how to run dev/test/lint, what agent docs exist, what's missing.

### 3. Walk decisions (one section at a time)

**A — Agent index file**

> Which file should hold the short "start here" block for agents?

- Edit existing **`CLAUDE.md`** if it exists, else **`AGENTS.md`**
- If neither exists, ask whether to create **`AGENTS.md`** (default) or **`CLAUDE.md`**

**B — Repo shape**

- **Monorepo** — use [repo-map-monorepo.md](templates/repo-map-monorepo.md) at `docs/agents/repo-map.md`; ask which `apps/*` (or deployables) get a spoke **`AGENTS.md`** from [AGENTS-app.md](templates/AGENTS-app.md)
- **Single app** — use [repo-map.md](templates/repo-map.md); one root `AGENTS.md` is enough (no per-app spokes unless user asks)

**C — Domain context**

- **`CONTEXT.md` already exists** — link only; do not overwrite
- **Missing** — offer a minimal stub from [templates/CONTEXT-stub.md](templates/CONTEXT-stub.md)
- **Multi-context** — `CONTEXT-MAP.md` at root; document in `docs/agents/domain.md` (or run Matt's setup for domain layout)

**D — Issue workflow**

- Will agents use GitHub/GitLab issues on this repo?
  - **Yes** → tell user to run **`setup-matt-pocock-skills`** next (or run it in the same session after this skill finishes)
  - **No / not yet** — skip `docs/agents/issue-tracker.md` unless they want local `.scratch/` issues

**E — External agent pack (optional)**

- Symlink `agents/` and `skills/` from [agentic](https://github.com/faris-isa/agentic) or another pack?
- Record paths in the `AGENTS.md` block (Open Code: `~/.config/opencode/`; Cursor: `.cursor/`; Pi: `~/.pi/agent/`)

### 4. Draft for approval

Show drafts of:

- `## For AI agents` block (from [templates/AGENTS-block.md](templates/AGENTS-block.md))
- `docs/agents/repo-map.md` (monorepo → [repo-map-monorepo.md](templates/repo-map-monorepo.md); else [repo-map.md](templates/repo-map.md))
- `docs/agents/commands.md` — root + per-workspace filters (from exploration)
- Optional `CONTEXT.md` stub at root and/or under apps
- Per chosen app: `apps/<name>/AGENTS.md` from [AGENTS-app.md](templates/AGENTS-app.md)

User edits before write.

### 5. Write

- Merge **`## For AI agents`** into the chosen index file (update in place if section exists).
- Create **`docs/agents/`** and write `repo-map.md`, `commands.md`.
- For monorepos: write **`apps/<name>/AGENTS.md`** only for workspaces the user selected (not every `packages/*` by default).
- Write **`CONTEXT.md`** only if user agreed and file is absent.
- Do **not** duplicate Matt's `issue-tracker.md` / `triage-labels.md` unless user skipped Matt setup and asked for placeholders.

### 6. Done

Tell the user:

- What was written and where agents should start reading
- Suggested next skills: **`setup-matt-pocock-skills`** (issues), **`zoom-out`** (unfamiliar area), **`grill-with-docs`** (before a large feature)
- They can edit `docs/agents/*` directly; re-run this skill when stack or entry points change materially

---

*Inspired by [mattpocock/skills setup-matt-pocock-skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills); extended for repo map and AGENTS index.*
