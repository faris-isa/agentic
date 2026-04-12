# Component Patterns

## Container/Presentational Pattern

Separate business logic from presentation.

```tsx
// Container (logic + data)
function UserListContainer() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />

  return <UserList users={data} />
}

// Presentational (UI only)
function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## Compound Components

Flexible, composable UI components.

```tsx
interface TabsProps {
  children: ReactNode
  defaultIndex?: number
}

interface TabProps {
  children: ReactNode
}

function Tabs({ children, defaultIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>
}

function Tab({ children }: TabProps) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  const index = useChildIndex() // Track which child this is

  return (
    <button
      className={activeIndex === index ? 'active' : ''}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  )
}

function TabPanel({ children }: TabProps) {
  const { activeIndex } = useContext(TabsContext)
  const index = useChildIndex()

  return activeIndex === index ? <div>{children}</div> : null
}

// Usage
<Tabs defaultIndex={0}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanel>Content 1</TabPanel>
  <TabPanel>Content 2</TabPanel>
</Tabs>
```

## Higher-Order Components (HOC)

Cross-cutting concerns like auth, logging.

```tsx
function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) return <Loading />

    if (!user) return <Redirect to="/login" />

    return <Component {...props} />
  }
}

// Usage
const ProtectedRoute = withAuth(Dashboard)
```

## Render Props

Dynamic rendering behavior.

```tsx
function MouseTracker({ render }: { render: (pos: Position) => ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {render(position)}
    </div>
  )
}

// Usage
<MouseTracker render={({ x, y }) => (
  <p>Mouse at {x}, {y}</p>
)} />
```

## Best Practices

1. **Start simple** - Use container/presentational for most cases
2. **Compound components** - For flexible, composable APIs
3. **Avoid over-abstraction** - Only add patterns when needed
4. **Type everything** - Use TypeScript generics for reusable patterns