---
name: bootstrap-agent-repo
description: Onboard a large or existing codebase for AI agents by exploring the repo and writing AGENTS.md, docs/agents/ (hub), docs/apps/<app>/README.md, docs/packages/<pkg>/README.md, and optional CONTEXT.md. Use when starting agent work on a new repo, missing agent docs, or user asks for AGENTS.md / agent onboarding / repo map for agents.
disable-model-invocation: true
---

# Bootstrap agent repo

Scaffold what agents need to work in **this** codebase without dumping everything into one giant prompt file.

**Relationship to other skills**

| Skill | When |
|-------|------|
| **This skill** | Repo map, commands, stack, `AGENTS.md` index, workspace READMEs under `docs/apps` and `docs/packages` |
| **`setup-matt-pocock-skills`** (Matt) | Issue tracker, triage labels, domain-doc *layout* for engineering skills |
| **`zoom-out`** | Per-area map during a session (after bootstrap) |
| **`grill-with-docs`** | Stress-test a *plan* against `CONTEXT.md` / ADRs |

Run **this** first on a large unknown repo. Run **`setup-matt-pocock-skills`** when you use `triage`, `to-issues`, or `to-prd` on GitHub/GitLab issues.

## Principles

1. **`AGENTS.md` is an index** — roster, links, non-negotiables (~80–150 lines max). Not a dump of every module.
2. **`docs/agents/` is the hub** — whole-repo map, commands, issue tracker, triage labels, domain consumer rules (Matt setup). **Not** per-app narrative.
3. **`docs/apps/<slug>/README.md`** — app/workspace docs (humans + agents). Mirrors `apps/<slug>/` in the repo.
4. **`docs/packages/<slug>/README.md`** — shared package docs. Mirrors `packages/<slug>/`.
5. **No `AGENTS.md` inside `apps/*` or `packages/*`** by default — keeps source trees clean.
6. **Explore before writing** — read manifests, CI, existing docs; do not invent paths.
7. **One decision at a time** — present findings, then ask; do not dump a questionnaire.
8. **Edit the file that already exists** — `CLAUDE.md` if present, else `AGENTS.md`; never create both.

## Monorepo layout (recommended)

```text
AGENTS.md                         ← index (“start here”)
docs/agents/
  repo-map.md                     ← whole monorepo; links to docs/apps & docs/packages
  commands.md                     ← root + workspace filters
  issue-tracker.md                ← after setup-matt-pocock-skills
  triage-labels.md
  domain.md
docs/apps/
  README.md                       ← index of apps ([template](templates/docs-apps-index.md))
  web/README.md                   ← app brief ([template](templates/app-README.md))
  api/README.md
docs/packages/
  README.md                       ← index of packages ([template](templates/docs-packages-index.md))
  ui/README.md                    ← package notes ([template](templates/package-README.md))
  shared/README.md
```

**Read order:** root `AGENTS.md` → `docs/agents/repo-map.md` → `docs/agents/commands.md` → **`docs/apps/<slug>/README.md`** or **`docs/packages/<slug>/README.md`** for the workspace being edited.

**Slug convention:** folder name under `apps/` or `packages/` (`apps/web` → `docs/apps/web/README.md`).

**“For AI agents” section:** include at the top or bottom of each workspace README ([app-README.md](templates/app-README.md), [package-README.md](templates/package-README.md)) — commands, rules, internal deps. Rest of the file can be normal product documentation.

**Domain language:** root `CONTEXT.md` / `CONTEXT-MAP.md`; link from workspace READMEs. Optional `docs/apps/<slug>/CONTEXT.md` only if the team already uses that pattern.

**Migration:**

| From | To |
|------|-----|
| `apps/*/AGENTS.md` | `docs/apps/<slug>/README.md` (merge “For AI agents” + delete or [pointer](templates/AGENTS-pointer.md)) |
| `docs/agents/apps/<slug>.md` | `docs/apps/<slug>/README.md` |
| Stray package notes in repo-map only | `docs/packages/<slug>/README.md` when package is non-trivial |

**Optional in-app pointer:** `apps/<name>/AGENTS.md` linking to `docs/apps/<name>/README.md` — only if user asks.

Templates: [repo-map-monorepo.md](templates/repo-map-monorepo.md), [app-README.md](templates/app-README.md), [package-README.md](templates/package-README.md).

## Process

### 1. Explore

Read what exists; note gaps:

- Root: `AGENTS.md`, `CLAUDE.md`, `README.md`, `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`
- `docs/agents/`, `docs/apps/`, `docs/packages/` — prior bootstrap?
- Legacy: `docs/agents/apps/*.md`, `apps/*/AGENTS.md`
- Stack: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `go.work`, etc.
- **Commands** and **CI**
- **Workspaces** under `apps/*`, `packages/*`
- **Agent packs** (e.g. symlinked [agentic](https://github.com/faris-isa/agentic))

### 2. Present findings

Summarise stack, commands, existing docs, gaps.

### 3. Walk decisions (one section at a time)

**A — Agent index file** — `CLAUDE.md` if present, else `AGENTS.md`; create only if missing.

**B — Repo shape**

- **Monorepo** — [repo-map-monorepo.md](templates/repo-map-monorepo.md); which `apps/*` get `docs/apps/<slug>/README.md`; which `packages/*` get `docs/packages/<slug>/README.md` (shared libs that agents touch often, not every tiny util)
- **Single app** — [repo-map.md](templates/repo-map.md); optional single `docs/apps/<name>/README.md` if code still lives under `apps/` or document primary tree in repo-map only

**C — Domain context** — link or stub `CONTEXT.md` / `CONTEXT-MAP.md`; Matt `domain.md` when using engineering skills

**D — Issue workflow** — `setup-matt-pocock-skills` if using GitHub/GitLab issues

**E — External agent pack** (optional)

**F — In-app pointers** (optional) — default **no**

### 4. Draft for approval

- `## For AI agents` block ([AGENTS-block.md](templates/AGENTS-block.md))
- `docs/agents/repo-map.md`, `commands.md`
- `docs/apps/README.md` + per-app READMEs
- `docs/packages/README.md` + per-package READMEs (if any)
- Optional root `CONTEXT.md` stub

### 5. Write

- Merge **`## For AI agents`** into root index file.
- Write **`docs/agents/repo-map.md`** and **`commands.md`**.
- Create **`docs/apps/<slug>/README.md`** and **`docs/packages/<slug>/README.md`** as agreed.
- Write index READMEs at `docs/apps/README.md` and `docs/packages/README.md`.
- Migrate legacy paths; remove duplicates.
- Do not duplicate Matt's tracker files unless requested.

### 6. Done

Summarise paths, read order, next skills (`setup-matt-pocock-skills`, `zoom-out`, `grill-with-docs`).

---

*Inspired by [mattpocock/skills setup-matt-pocock-skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills).*
