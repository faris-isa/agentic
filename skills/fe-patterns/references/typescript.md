# TypeScript for React

## Component Props

```tsx
// ✅ Basic props
function Button({ label, onClick }: {
  label: string
  onClick: () => void
}) {
  return <button onClick={onClick}>{label}</button>
}

// ✅ With optional props
function Avatar({ src, alt, size = 'md' }: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return <img src={src} alt={alt} className={`size-${size}`} />
}

// ✅ With children
function Card({ children, title }: {
  children: ReactNode
  title?: string
}) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}
```

## Generic Components

```tsx
function List<T>({ items, render }: {
  items: T[]
  render: (item: T) => ReactNode
}) {
  return <div>{items.map(render)}</div>
}

// Usage
<List
  items={users}
  render={(user) => <div>{user.name}</div>}
/>
```

## Event Types

```tsx
// Form events
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
}

// Input events
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value
}

// Button events
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.currentTarget)
}
```

## Type Inference

```tsx
// ✅ Let TypeScript infer
const [count, setCount] = useState(0) // type: number
const [user, setUser] useState<User | null>(null) // type: User | null

// ✅ TanStack Query infers types
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetchUsers(),
}) // data: User[] | undefined
```

## Avoid `any`

```tsx
// ❌ Never use any
const data: any = fetchData()

// ✅ Use unknown for generic
function parseData(data: unknown) {
  if (isUser(data)) {
    return data.name // typed
  }
}

// ✅ Use type guards
function isUser(obj: unknown): obj is User {
  return 'id' in obj && 'name' in obj
}
```

## Import ReactNode properly

```tsx
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
```

## Best Practices

1. **Type everything** - No implicit `any`
2. **Use inference** - Let TS infer when obvious
3. **Generics** - For reusable components
4. **Type guards** - For runtime checks
5. **Avoid `as`** - Use proper validation instead