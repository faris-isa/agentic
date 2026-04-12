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

## 🎯 Usage

1. **Start with Lead Dev** - It will guide you through the workflow
2. **Spec Agent** creates design, waits for your approval
3. **Implementation** begins only after you approve the spec

## 🔧 Skills

- **shadcn-ui**: Detailed component patterns and design review

## 📖 Documentation

- **ITERATION.md**: Detailed project iteration log documenting our workflow improvements and learnings from each development cycle
