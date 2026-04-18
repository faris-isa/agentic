---
name: request-refactor-plan
description: Create a detailed refactor plan with tiny commits via user interview, then file it as a GitHub issue. Use when user wants to plan a refactor, create a refactoring RFC, or break a refactor into safe incremental steps.
---

1. Ask user for detailed description of the problem and potential solutions.

2. Explore the repo to verify their assertions.

3. Ask about other options considered.

4. Interview about implementation details.

5. Hammer out exact scope: what to change, what NOT to change.

6. Check test coverage. If insufficient, ask about testing plans.

7. Break into tiny commits (Martin Fowler: "make each refactoring step as small as possible").

8. Create GitHub issue with template:

## Problem Statement

The problem from developer's perspective.

## Solution

The solution from developer's perspective.

## Commits

Detailed implementation plan in plain English. Each commit leaves codebase working.

## Decision Document

- Modules being built/modified
- Interfaces being modified
- Technical clarifications
- Architectural decisions
- Schema changes
- API contracts

## Testing Decisions

- What makes good test
- Which modules will be tested
- Prior art for tests

## Out of Scope

What's not included.

## Further Notes

Any additional notes.

---

*Skill adapted from [mattpocock/skills](https://github.com/mattpocock/skills) - request-refactor-plan*