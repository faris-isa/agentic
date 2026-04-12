---
name: fe-patterns
description: Reference for frontend React patterns - component architecture, hooks, state management, TanStack Query, performance.
---

This skill contains frontend React patterns organized by topic.

## Available References

| File | Topic |
|------|-------|
| `references/components.md` | Component patterns (compound, container/presentational, HOC) |
| `references/hooks.md` | Custom hooks and hooks best practices |
| `references/tanstack-query.md` | TanStack Query patterns for data fetching |
| `references/state.md` | State management (Context, Zustand, patterns) |
| `references/performance.md` | Performance optimization patterns |
| `references/typescript.md` | TypeScript patterns for React |

## Topics Covered

### Component Patterns
- Container/Presentational
- Compound Components
- Higher-Order Components
- Render Props

### Hooks Mastery
- useState, useEffect
- Custom hooks
- useReducer

### Data Fetching
- TanStack Query v5
- Infinite queries
- Optimistic updates

### Performance
- React.memo
- useMemo, useCallback
- Code splitting
- Lazy loading

## Best Practices

1. **Composition over inheritance** - Use children and render props
2. **Keep states close to components** - Don't lift state unnecessarily
3. **Use TypeScript** - Proper typing for all props
4. **Server Components by default** - Use 'use client' only when needed
5. **TanStack Query for server state** - Never use useEffect for fetching