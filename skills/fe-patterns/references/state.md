# State Management Patterns

## Local State (useState)

For simple component state.

```tsx
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)
```

## Global State Options

| Solution | Use Case | Size |
|----------|----------|------|
| Context + useReducer | App-wide state (theme, auth) | ~0kb |
| Zustand | Complex state, simple API | ~1kb |
| TanStack Query | Server state | ~7kb |
| Jotai | Atomic state | ~2kb |

## Context for App State

```tsx
// AuthContext.tsx
const AuthContext = createContext<{
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (credentials: Credentials) => {
    const user = await authService.login(credentials)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Usage
const { user, logout } = useContext(AuthContext)
```

## Zustand

```tsx
// store/userStore.ts
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

// Usage
const { user, logout } = useUserStore()
```

## State Location Guidelines

```
Where should this state live?

┌─────────────────────────────────────────────────────┐
│ Only this component uses it?                        │
│   → useState in this component                     │
│                                                     │
│ Multiple components in same tree?                   │
│   → useState + prop drilling OR context            │
│                                                     │
│ App-wide state (theme, auth, locale)?               │
│   → Context or Zustand                              │
│                                                     │
│ Server data (API responses)?                        │
│   → TanStack Query (NEVER useEffect!)              │
│                                                     │
│ Form state?                                         │
│   → React Hook Form + Zod                           │
└─────────────────────────────────────────────────────┘
```

## Best Practices

1. **Keep state as local as possible** - Only lift when needed
2. **TanStack Query for server state** - Never use useEffect for fetching
3. **Use Context sparingly** - Too many contexts = performance issues
4. **Zustand for complex client state** - Simpler than Redux
5. **React Hook Form for forms** - Best form handling in React