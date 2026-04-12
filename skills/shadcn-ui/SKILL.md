---
name: shadcn-ui
description: Expert in shadcn/ui component library with TanStack Query integration. Use when working with React projects that use shadcn/ui components.
---

This skill provides deep knowledge of shadcn/ui components, CLI commands, theming, and best practices for AI-assisted development.

## Overview

shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. Components are copied into your project (not installed as a dependency) giving you full ownership and customization.

## Project Detection

This skill activates when:
- A `components.json` file exists in the project
- The project uses Tailwind CSS
- shadcn/ui CLI (`shadcn`) is available

## Get Project Context

Always run this command to get the project's configuration:

```bash
pnpx shadcn@latest info --json
```

This returns:
- Framework (Next.js, Vite, Remix, etc.)
- Tailwind version
- CSS variables prefix
- Base library (radix or base)
- Icon library
- Installed components
- Resolved file paths

## CLI Commands

### Initialize shadcn/ui

```bash
pnpx shadcn@latest init
```

Options:
- `-d` or `--defaults` - Use default settings
- `-y` - Skip prompts
- `--schema` - Custom components.json schema

### Add Components

```bash
# Add single component
pnpx shadcn@latest add button

# Add multiple components
pnpx shadcn@latest add button card dialog

# Add all components
pnpx shadcn@latest add -a

# Dry run (preview what would be added)
pnpx shadcn@latest add button --dry-run
```

### Search Components

```bash
pnpx shadcn@latest search [query]
```

### View Component Details

```bash
pnpx shadcn@latest docs [component]
```

### Check for Updates

```bash
pnpx shadcn@latest diff
pnpx shadcn@latest info
```

## Available Components

### Layout
- Accordion, Aspect Ratio, Card, Collapsible, Resizable, Scroll Area, Separator, Skeleton

### Forms
- Checkbox, Field, Input, Input Group, Input OTP, Label, Native Select, Radio Group, Select, Textarea, Toggle, Toggle Group

### Overlays
- Alert Dialog, Context Menu, Dialog, Drawer, Hover Card, Menubar, Popover, Sheet, Tooltip

### Navigation
- Breadcrumb, Navigation Menu, Pagination, Tabs

### Data Display
- Avatar, Badge, Table, Kbd

### Feedback
- Alert, Progress, Sonner (toast), Spinner

### Media
- Calendar, Carousel, Chart

### Actions
- Button, Switch, Slider, Command

## Using Components

### Basic Usage

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        Content here
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### With TanStack Query

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  name: string
  email: string
}

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  })

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    )
  }

  if (error) {
    return <Alert variant="destructive">Failed to load users</Alert>
  }

  return (
    <div className="grid gap-4">
      {data?.map((user: User) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {user.email}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function CreateUserForm() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      mutation.mutate({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      })
    }}>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  )
}
```

### Using Forms with React Hook Form

```tsx
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Theming

### CSS Variables (Tailwind v3)

Defined in `src/index.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark theme variables */
  }
}
```

### Tailwind v4 Theme (New)

In `src/app.css`:

```css
@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Applying Colors

```tsx
// Using semantic colors
<div className="bg-background text-foreground">
  Content
</div>

// Using primary/secondary
<Button className="bg-primary text-primary-foreground">
  Click me
</Button>

// Destructive actions
<Alert variant="destructive">
  Error message
</Alert>
```

## Dark Mode

### Setup

```bash
pnpx shadcn@latest add sheet
```

### Using

```tsx
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
```

## Component Variants

### Button Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes

```tsx
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

## Best Practices

### 1. Use Field Components for Forms

```tsx
// Correct - use Field components
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

### 2. Use ToggleGroup for Option Sets

```tsx
<ToggleGroup type="single" value={size} onValueChange={setSize}>
  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
  <ToggleGroupItem value="md">Medium</ToggleGroupItem>
  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
</ToggleGroup>
```

### 3. Use Semantic Colors

- Use `destructive` for error/delete actions
- Use `primary` for main call-to-action
- Use `secondary` for less important actions

### 4. Loading States with Skeleton

```tsx
{isLoading ? (
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
) : (
  <Content />
)}
```

### 5. Toast Notifications

```tsx
import { toast } from "sonner"

toast.success("User created successfully")
toast.error("Failed to create user")
toast.info("Please verify your email")
```

## Review Output Format

See [references/review-output-format.md](references/review-output-format.md) for the full review template.

## Review Type Modifiers

See [references/review-type-modifiers.md](references/review-type-modifiers.md) for context-specific review focus areas (PR, Creative, Design, Accessibility).

## Quick Checklist

See [references/quick-checklist.md](references/quick-checklist.md) for the pre-approval checklist covering design system compliance, aesthetic quality, frictionless, quality craft, and trustworthy pillars.

## Pattern Examples

See [references/pattern-examples.md](references/pattern-examples.md) for good/bad examples of creative frontend and design system review work.

## Troubleshooting

### Component not found
Run `pnpx shadcn@latest add [component]` to add it

### Styles not applying
Check `components.json` path configuration matches your alias

### Dark mode not working
Ensure `useTheme` hook is properly set up and `next-themes` is installed

## Resources

- [Docs](https://ui.shadcn.com/docs)
- [Components](https://ui.shadcn.com/docs/components)
- [CLI Reference](https://ui.shadcn.com/docs/cli)
- [Theming](https://ui.shadcn.com/docs/theming)
- [Forms](https://ui.shadcn.com/docs/forms/react-hook-form)