---
name: improve-codebase-architecture
description: Explore a codebase to find architectural improvement opportunities, focusing on making shallow modules deeper. Use when user wants to improve architecture, find refactoring opportunities, consolidate modules, or make codebase more AI-navigable.
---

# Improve Codebase Architecture

Explore a codebase to surface architectural friction and propose module-deepening refactors as GitHub issue RFCs.

A **deep module** has a small interface hiding a large implementation. Deep modules are more testable and AI-navigable.

## Process

### 1. Explore the codebase

Navigate organically and note friction:
- Where does understanding one concept require many small files?
- Where are modules so shallow that interface ~= implementation?
- Where are tight耦合 create integration risk?
- Which parts are untested or hard to test?

The friction IS the signal.

### 2. Present candidates

Numbered list of deepening opportunities:
- **Cluster**: modules/concepts involved
- **Why coupled**: shared types, call patterns
- **Test impact**: what tests would be replaced by boundary tests

### 3. User picks candidate

### 4. Frame problem space

Write explanation:
- constraints any new interface needs
- dependencies
- rough code sketch (not proposal, just grounding)

### 5. Design multiple interfaces

Spawn 3+ sub-agents in parallel. Each produces different interface:
- Agent 1: "Minimize interface — 1-3 entry points"
- Agent 2: "Maximize flexibility"
- Agent 3: "Optimize for common caller"
- Agent 4: "Ports & adapters pattern"

Each outputs:
1. Interface signature
2. Usage example
3. What it hides
4. Dependency strategy
5. Trade-offs

Compare, then give recommendation.

### 6. User picks interface

### 7. Create GitHub issue

Create refactor RFC as GitHub issue.

---

*Skill adapted from [mattpocock/skills](https://github.com/mattpocock/skills) - improve-codebase-architecture*