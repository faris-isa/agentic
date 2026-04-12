# Performance Optimization

## React.memo

```tsx
const UserCard = memo(function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
})
```

## useMemo

```tsx
// ✅ For expensive calculations
const sortedUsers = useMemo(() => {
  return users
    .filter(...)
    .sort((a, b) => a.name.localeCompare(b.name))
}, [users])

// ❌ Don't overuse - only for expensive operations
const value = useMemo(() => 42, [])
```

## useCallback

```tsx
// ✅ For callback props that affect child re-renders
const handleClick = useCallback((id: number) => {
  setSelected(id)
}, [])

return <Button onClick={handleClick} />

// ❌ Unnecessary for inline functions
const handleClick = useCallback(() => {}, [])
```

## Code Splitting

```tsx
import { lazy, Suspense } const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Lazy Loading Routes

```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      } />
    </Routes>
  )
}
```

## Avoid Unnecessary Re-renders

```tsx
// ❌ Causes re-render on every parent render
function Parent() {
  return <Child onClick={() => {}} />
}

// ✅ Stable reference
function Parent() {
  const handleClick = useCallback(() => {}, [])
  return <Child onClick={handleClick} />
}
```

## Optimize Data Fetching

```tsx
// ❌ Sequential (slow)
const user = await fetchUser(id)
const posts = await fetchPosts(user.id)

// ✅ Parallel (fast)
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id)
])
```

## Avoid Waterfalls

```tsx
// ❌ Await in loop
for (const id of ids) {
  const data = await fetchData(id) // Sequential!
}

// ✅ Promise.all parallel
const results = await Promise.all(ids.map(id => fetchData(id)))
```

## Bundle Size

```bash
# Check bundle
vp build
# or
vite build --report

# Use dynamic imports
const Chart = lazy(() => import('./Chart'))
```

## Performance Checklist

- [ ] Use `React.memo` for expensive components
- [ ] Use `useMemo`/`useCallback` only when needed
- [ ] Code split routes with `lazy()`
- [ ] Avoid sequential awaits (use `Promise.all`)
- [ ] Monitor bundle size
- [ ] Use TanStack Query with proper `staleTime`
- [ ] Remove unused dependencies

## DevTools

```tsx
// Use React DevTools Profiler to identify:
// - Slow components
// - Unnecessary re-renders
// - Large component trees
```