# Isa Agentic Workflow

A comprehensive collection of specialized AI agents designed to accelerate and enhance every aspect of rapid development. Each agent represents my current knowledge and will be improved later.

## 📥 Installation

1. **Download this repository:**
   ```bash
   git clone https://github.com/faris-isa/agentic.git
   ```

2. **Symlink to opencode agents directory:**
   ```bash
   ln -s ~/app/isa/agentic/agents ~/.config/opencode/agents
   ln -s ~/app/isa/agentic/skills ~/.config/opencode/skills
   ```

3. **Restart Open Code** to load the new agents.

### Pi (pi-coding-agent)

Pi loads project context from `AGENTS.md` (this repo includes one at the root) and discovers extensions from `~/.pi/agent/extensions` and `<repo>/.pi/extensions`. Team presets live in `.pi/agents/teams.yaml`.

**Requirements:** Node.js 22+ and Pi **v0.71+** (extensions layout; see [extensions migration](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/CHANGELOG.md#extensions-migration) and [extensions docs](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/docs/extensions.md)).

**Optional — Cursor models inside Pi:**

```bash
pi install npm:@schultzp2020/pi-cursor
```

Then run `/login` in Pi, choose **Cursor**, and pick a model with `/model`.

**Symlink this repo into Pi’s agent dir** (adjust the left side if your clone path differs):

```bash
mkdir -p ~/.pi/agent
ln -sf ~/app/isa/agentic/.pi/agents ~/.pi/agents
ln -sf ~/app/isa/agentic/.pi/extensions ~/.pi/agent/extensions
ln -sf ~/app/isa/agentic/skills ~/.pi/agent/skills
```

Restart Pi after changing symlinks. The `agent-team` stub under `.pi/extensions/agent-team/` exists so Pi’s extension scanner always has a valid entry when this folder is linked.

## 🏗️ Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
│                    "Build something"                        │
└─────────────────────┬───────────────────────────────────────┘
                      ↓
┌─────────────────────↓───────────────────────────────────────┐
│                    LEAD DEV (Primary)                       │
│  • Understand the request                                    │
│  • Invoke spec-agent to design                             │
│  • Wait for user approval                                   │
│  • Delegate to implementation agents                       │
└─────────────────────────────────────────────────────────────┘
                               ↓
                    ┌──────────────┴──────────────┐
                    ↓                                 ↓
┌─────────────────────────↓              ┌─────────↓─────────────────┐
│              SPEC AGENT                  │         BACKEND-DEV     │
│  • Asks clarifying questions            │  • Hono/Node.js OR      │
│  • Creates Technical Specification      │    Gin/Go              │
│  • Waits for explicit approval          │  • PostgreSQL + Drizzle│
│                                        │  • JWT Auth             │
└────────────────────────────────────────┴─────────────────────────┘
                    ↓                                 ↓
                    └──────────────┬──────────────┘
                                   ↓
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND-DEV                              │
│  • React + TypeScript                                       │
│  • TanStack Query for server state                         │
│  • shadcn/ui for components                                │
│  • Vite+ for build                                          │
└─────────────────────────────────────────────────────────────┘
```

## 👥 Team

| Agent | Type | Role |
|-------|------|------|
| **lead-dev** | primary | Orchestrates workflow, coordinates team |
| **spec-agent** | subagent | Designs Technical Specifications, gets approval |
| **frontend-dev** | subagent | Implements frontend (React, TanStack Query, shadcn/ui) |
| **backend-dev** | subagent | Implements backend (Hono/Node or Gin/Go + PostgreSQL) |
| **qa-agent** | subagent | Tests and verifies implementation |
| **researcher** | subagent | Investigates libraries, patterns, and trade-offs |
| **deployment-dev** | subagent | Docker, CI/CD, hosting |
| **obsidian-agent** | subagent | Obsidian vault search and notes |
| **git** | subagent | Git commits, branches, GitHub via `gh` |
| **iteration-agent** | subagent | Captures feedback and learnings |

Pi / dispatcher presets (`full`, `implement`, `research`) are listed in `.pi/agents/teams.yaml`.

## 🎯 Usage

1. **Start with Lead Dev** - It will guide you through the workflow
2. **Spec Agent** creates design, waits for your approval
3. **Implementation** begins only after you approve the spec

## 🔧 Skills

- **vite-plus**: Vite+ (vp) commands and workflows
- **shadcn-ui**: Detailed component patterns and design review
- **drizzle-orm**: PostgreSQL with Drizzle ORM patterns
- **backend-patterns**: Elysia, Hono, Gin backend frameworks
- **fe-patterns**: React frontend patterns (hooks, TanStack Query, etc.)

## 📖 Documentation

- **Agent Key Learnings**: Each agent file contains key learnings extracted from project iterations
