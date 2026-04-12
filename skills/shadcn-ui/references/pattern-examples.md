# Pattern Examples

## Creative Frontend (New Interfaces)

### Good: Clear Aesthetic Direction
- Landing page with brutalist aesthetic: Raw typography (distinctive font), stark black and white, asymmetric layouts
- Dashboard with organic theme: Rounded forms, earth tones, flowing animations, textured backgrounds

### Bad: Generic AI Aesthetic
- Overused fonts (Inter, Roboto), cliched color schemes, centered content, generic card layouts

## shadcn/ui Component Review (Existing Work)

### Good: Frictionless
- Single primary button, clear task completion path
- Proper use of shadcn/ui Button with clear action hierarchy

### Good: Quality Craft
- Uses shadcn/ui components with CSS variables, distinctive typography, keyboard accessible, tested in themes

### Bad: Quality Craft
- Hardcoded values instead of CSS variables, generic overused fonts, poor contrast in dark mode

### Good: Loading State with TanStack Query
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})

if (isLoading) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}
```

### Bad: Loading State
- No skeleton, raw "Loading..." text, no error handling

### Good: Form with React Hook Form
```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Bad: Form
- No FormField wrapper, inline validation, missing FormLabel accessibility