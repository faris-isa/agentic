# TanStack Query Patterns

## Basic Query

```tsx
import { useQuery } from '@tanstack/react-query'

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  })

  if (isLoading) return <Skeleton />
  if (error) return <Error error={error} />

  return <div>{data.map(user => <UserCard key={user.id} user={user} />)}</div>
}
```

## Query with Params

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    enabled: !!userId, // Only run when userId exists
  })

  return <div>{data?.name}</div>
}
```

## Mutations

```tsx
function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newUser: NewUser) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }).then(res => res.json()),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <form onSubmit={mutation.mutate}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

## Optimistic Updates

```tsx
function UpdateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateUser,
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users'] })

      // Snapshot previous value
      const previousUsers = queryClient.getQueryData(['users'])

      // Optimistically update
      queryClient.setQueryData(['users'], (old: User[]) =>
        old.map(user => user.id === newData.id ? { ...user, ...newData } : user)
      )

      return { previousUsers }
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(['users'], context?.previousUsers)
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## Infinite Queries (Pagination)

```tsx
function UserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      fetch(`/api/users?page=${pageParam}`).then(res => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  return (
    <div>
      {data?.pages.map(page =>
        page.users.map(user => <UserCard key={user.id} user={user} />)
      )}
      <button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  )
}
```

## Prefetching

```tsx
function UserCard({ user }: { user: User }) {
  const queryClient = useQueryClient()

  const handleHover = () => {
    queryClient.prefetchQuery({
      queryKey: ['user', user.id],
      queryFn: () => fetch(`/api/users/${user.id}`).then(res => res.json()),
    })
  }

  return <div onMouseEnter={handleHover}>{user.name}</div>
}
```

## Stale Time & Caching

```tsx
// Cache data for 5 minutes
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
})
```

## Error Handling

```tsx
function UserList() {
  const { error, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isError) {
    return (
      <div>
        <p>Failed to load users</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }
}
```

## Best Practices

1. **Use `staleTime`** - Reduce unnecessary refetches
2. **Use `enabled`** - Control when queries run
3. **Invalidate on mutations** - Keep data fresh
4. **Use optimistic updates** - Better UX
5. **Use `refetchOnWindowFocus: false`** - Prevent annoying refetches
6. **Never use useEffect for data fetching** - Use TanStack Query instead