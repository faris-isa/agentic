---
name: vite-plus
description: Reference for Vite+ (vp) commands and workflows. The unified toolchain for web development.
---

Vite+ is the unified toolchain that combines Vite, Vitest, Oxlint, Oxfmt, Rolldown, and more into one command-line interface.

## Core Philosophy

**One tool, everything** - `vp` handles the entire frontend development lifecycle:
- Runtime & package management
- Development server
- Format, lint, type-check
- Testing
- Building

## Installation

### macOS / Linux
```bash
curl -fsSL https://vite.plus | bash
```

### Windows
```powershell
irm https://vite.plus/ps1 | iex
```

After install, verify with:
```bash
vp help
```

## Core Commands

| Command | Description |
|---------|-------------|
| `vp create` | Create new projects (apps, packages, monorepos) |
| `vp install` | Install dependencies |
| `vp dev` | Start development server |
| `vp check` | Format, lint, and type-check in one command |
| `vp test` | Run tests via Vitest |
| `vp build` | Build for production |
| `vp preview` | Preview production build |

### Development Commands

```bash
vp dev              # Start dev server with HMR
vp check            # Run format + lint + type-check together
vp check --fix      # Auto-fix format and lint issues
vp lint             # Run linter only (Oxlint)
vp fmt              # Run formatter only (Oxfmt)
vp test             # Run tests
vp test run         # Run specific test file
```

### Execute Commands

```bash
vp run <task>       # Run package.json scripts with caching
vp exec <cmd>       # Run local binaries from node_modules
vp dlx <pkg>        # Download and run package without installing
vpx <pkg>           # Download and run global binaries
```

### Dependency Management

```bash
vp add <package>    # Install package (like npm i)
vp remove <package> # Remove package
vp update           # Update dependencies
vp dedupe           # Remove duplicate dependencies
vp outdated         # Check outdated packages
vp why <package>    # Why is this package installed?
vp pm <command>     # Run package manager commands directly
```

### Build Commands

```bash
vp build            # Build app for production
vp pack             # Build library/package
vp preview          # Preview production build locally
```

### Maintenance

```bash
vp upgrade          # Update vp itself
vp implode          # Remove vp and all data (if you want to uninstall)
vp env              # Manage Node.js versions
vp env current      # Show current Node version
vp env off          # Disable vp's Node version management
```

## Common Workflows

### New Project
```bash
vp create my-app
cd my-app
vp install
vp dev
```

### Migrate Existing Project
```bash
cd existing-project
vp migrate
```

### Pre-commit Checks
```bash
vp staged           # Run checks on staged files only
```

### Running Tests
```bash
vp test             # Run all tests
vp test run src/components/Button.test.tsx  # Run specific file
vp test run --watch  # Watch mode
```

### Check Code Quality
```bash
vp check            # Format + lint + type-check
vp check --fix     # Auto-fix issues
```

## Configuration

Vite+ uses `vite.config.ts` for all configuration:

```typescript
import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Standard Vite config
  plugins: [],
  
  // Test config (Vitest)
  test: {
    include: ['src/**/*.test.ts'],
  },
  
  // Lint config (Oxlint)
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  
  // Format config (Oxfmt)
  fmt: {
    semi: true,
    singleQuote: true,
  },
  
  // Custom tasks
  run: {
    tasks: {
      'generate': { command: 'node scripts/generate.js' },
    },
  },
  
  // Staged files hook
  staged: {
    '*': 'vp check --fix',
  },
});
```

### Lint Options

```typescript
lint: {
  options: {
    typeAware: true,    // Enable type-aware linting
    typeCheck: true,   // Enable TypeScript type checking
  },
  plugins: [
    'typescript',      // Built-in
    'react',          // Built-in
    'import',         // Built-in
  ],
  jsPlugins: [
    // External ESLint plugins
  ],
  ignorePatterns: ['dist/**', 'node_modules/**'],
}
```

### Format Options

```typescript
fmt: {
  semi: boolean,
  singleQuote: boolean,
  trailingComma: 'all' | 'es5' | 'none',
  printWidth: number,
}
```

## Key Differences from Standard Tools

| Standard Tool | Vite+ Equivalent |
|---------------|------------------|
| `eslint` | `vp lint` (uses Oxlint) |
| `prettier` | `vp fmt` (uses Oxfmt) |
| `tsc --check` | `vp check` (includes type-check) |
| `vitest` | `vp test` |
| `vite` | `vp dev` / `vp build` |

## Performance

- **Oxlint**: ~50-100x faster than ESLint (Rust-based)
- **Oxfmt**: ~30x faster than Prettier (Rust-based)
- **Rolldown**: Faster than esbuild
- **Unified**: All tools work together seamlessly

## Integration

### VS Code
Use official extension for best experience.

### GitHub Actions
```yaml
- uses: voidzero-dev/setup-vp@v1
- run: vp check
```

### CI/CD
```bash
vp install
vp check
vp test
vp build
```

## Troubleshooting

### vp check doesn't run type-aware rules
- Ensure `lint.options.typeAware: true` in vite.config.ts
- Check if tsconfig.json has `baseUrl` (oxlint doesn't support it)

### vp test fails
- Check vitest config in vite.config.ts
- Ensure test files match include pattern

## Best Practices

✅ Use `vp check` instead of running separate lint/type-check commands
✅ Use `vp create` for new projects
✅ Use `vp migrate` to convert existing projects
✅ Configure lint and fmt in vite.config.ts, not separate config files
✅ Use `vp staged` in pre-commit hooks

🚫 Don't use npm/pnpm/yarn directly for basic commands - vp wraps them
🚫 Don't need separate ESLint/Prettier configs - vp handles it internally