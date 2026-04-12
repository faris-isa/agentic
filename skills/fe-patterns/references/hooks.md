# Custom Hooks

## Basic Custom Hook

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle, setValue] as const
}

// Usage
const [isOpen, toggle] = useToggle()
```

## Fetch Hook

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

## useState with LocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

## Hooks Best Practices

### 1. Always include dependencies in deps array
```tsx
// ❌ Wrong
useEffect(() => {
  fetch(id).then(...) // id not in deps
}, [])

// ✅ Correct
useEffect(() => {
  fetch(id).then(...)
}, [id])
```

### 2. Use useCallback for functions passed to children
```tsx
// ✅ Prevents unnecessary re-renders
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])
```

### 3. Use useMemo for expensive calculations
```tsx
// ✅ Only recalculate when deps change
const expensive = useMemo(() => {
  return data.filter(...).sort(...)
}, [data])
```

### 4. Don't overuse useMemo/useCallback
```tsx
// ❌ Unnecessary - primitives don't need memoization
const value = useMemo(() => 42, [])

// ❌ Unnecessary - child doesn't re-render often
const handleClick = useCallback(() => {}, [])
```

### 5. Use useReducer for complex state
```tsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
```

## Common Hook Patterns

| Hook | Use Case |
|------|----------|
| `useState` | Simple local state |
| `useReducer` | Complex state logic |
| `useEffect` | Side effects (not data fetching!) |
| `useRef` | Mutable refs, DOM access |
| `useContext` | Global state |
| `useMemo` | Expensive calculations |
| `useCallback` | Function memoization |