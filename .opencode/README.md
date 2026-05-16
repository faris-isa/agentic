# Open Code — workspace bundle

Canonical Open Code–related files live under **`.opencode/`** (Oh My OpenAgent config, local plugins). **Project** `opencode.json` at the **repo root** holds providers, npm plugins, and MCP stubs so you can symlink it into `~/.config/opencode/` like `agents` / `skills`.

## Layout

| Path | Purpose |
|------|---------|
| `oh-my-openagent.json` | OMO agents + categories ([project path](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/reference/configuration.md#file-locations)) |
| `plugins/` | Auto-loaded when this repo is the Open Code project ([local plugins](https://opencode.ai/docs/plugins)) |
| `README.md` | This file |

Open Code merges **global** `~/.config/opencode/opencode.json`, **project** `<repo>/opencode.json`, and **`.opencode/*`**. Plugins in `.opencode/plugins/` load when the **workspace root** is this repo.

## Symlink from this repo (same idea as `agents` / `skills`)

Adjust `AGENTIC` to your clone path.

```bash
AGENTIC="${AGENTIC:-$HOME/app/isa/agentic}"

ln -sfn "$AGENTIC/agents"            ~/.config/opencode/agents
ln -sfn "$AGENTIC/skills"            ~/.config/opencode/skills
ln -sfn "$AGENTIC/opencode.json"     ~/.config/opencode/opencode.json
ln -sfn "$AGENTIC/.opencode/oh-my-openagent.json" ~/.config/opencode/oh-my-openagent.json

mkdir -p ~/.config/opencode/plugins
ln -sfn "$AGENTIC/.opencode/plugins/blob-error-filter.ts" \
        ~/.config/opencode/plugins/blob-error-filter.ts
```

Then restart Open Code.

**Using another project as workspace:** global symlinks still apply; optional MCP/provider blocks in `opencode.json` follow you. For OMO + plugins, either open **`agentic`** as the project or keep the `plugins` symlink so `blob-error-filter` loads globally.

## Secrets (MCP Postgres)

The committed `opencode.json` uses **placeholders** and **`enabled: false`** for Postgres MCP. Put real connection strings in a **local-only** override (Open Code merges configs), e.g. `~/.config/opencode/opencode.json` + project file, or use [`{file:...}` substitution](https://opencode.ai/docs/config) for keys/URIs. **Rotate any credentials that ever lived in plain JSON.**

## See also

Root [README.md](../README.md) (Installation · Open Code).
