# markdown-preview.nvim Shiki Upgrade Plan

**Goal:** Replace highlight.js with Shiki for VS Code-quality syntax highlighting

**Fork:** `git@github.com:sdbuch/markdown-preview.nvim.git`

**Status:** Planning (not yet implemented)

---

## Background

### Current Problem

markdown-preview.nvim uses **highlight.js** for syntax highlighting:
- Regex-based pattern matching
- Limited accuracy (doesn't understand method chains, context, etc.)
- Example: `torch.ops.aten.full.default()` doesn't highlight well

### Solution

**Shiki** = VS Code's TextMate grammar engine as a Node.js library:
- Full lexer-based parsing (not regex)
- Uses actual VS Code grammars
- Runs server-side in Node.js (markdown-preview.nvim is a Node/Next.js app)
- Outputs pre-highlighted HTML

```
Current:  Markdown → Server → HTML + raw code → Browser → highlight.js (regex)
Better:   Markdown → Server → Shiki (TextMate) → Pre-highlighted HTML → Browser
```

---

## Quick Fix (Already Applied, Will Be Overwritten)

When loading from the fork, the monokai theme fix will be lost. Re-apply with:

```bash
# Download monokai CSS
curl -sL -o ~/.config/nvim/monokai.min.css \
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css"

# Copy to plugin (after cloning fork)
cp ~/.config/nvim/monokai.min.css \
  ~/path/to/fork/markdown-preview.nvim/app/_static/highlight.css
```

This is a stopgap until Shiki is implemented.

---

## Implementation Plan

### Phase 1: Setup & Exploration (30 min)

1. Clone the fork locally:
   ```bash
   git clone git@github.com:sdbuch/markdown-preview.nvim.git
   cd markdown-preview.nvim
   ```

2. Examine the app structure:
   ```bash
   ls -la app/
   # Key files:
   # - app/lib/          → markdown rendering logic
   # - app/server.js     → main server
   # - app/pages/        → Next.js pages
   # - app/package.json  → dependencies
   ```

3. Find where highlight.js is used:
   ```bash
   grep -r "highlight" app/ --include="*.js" --include="*.ts"
   grep -r "hljs" app/ --include="*.js" --include="*.ts"
   grep -r "markdown-it\|marked" app/ --include="*.js" --include="*.ts"
   ```

4. Identify the markdown parser (likely `markdown-it` or `marked`)

### Phase 2: Add Shiki (15 min)

```bash
cd app/
npm install shiki
# or if using yarn:
yarn add shiki
```

Check if `markdown-it-shiki` plugin exists and is compatible:
```bash
npm info markdown-it-shiki
```

### Phase 3: Create Shiki Highlighter Module (30 min)

Create `app/lib/shiki-highlighter.js`:

```javascript
const shiki = require('shiki')

let highlighter = null
let initPromise = null

// Lazy initialization (Shiki loads grammars async)
async function getHighlighter() {
  if (highlighter) return highlighter

  if (!initPromise) {
    initPromise = shiki.createHighlighter({
      themes: ['monokai', 'github-dark', 'github-light'],
      langs: [
        'python', 'javascript', 'typescript', 'bash', 'shell',
        'rust', 'lua', 'yaml', 'json', 'toml', 'markdown',
        'c', 'cpp', 'java', 'go', 'ruby', 'html', 'css', 'sql'
      ]
    })
  }

  highlighter = await initPromise
  return highlighter
}

// Synchronous highlight (for markdown-it integration)
// Falls back to plain text if highlighter not ready
function highlight(code, lang, theme = 'monokai') {
  if (!highlighter) {
    // Trigger init for next time, return escaped code for now
    getHighlighter()
    return escapeHtml(code)
  }

  try {
    // Shiki needs valid lang, fallback to 'text'
    const validLang = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text'
    return highlighter.codeToHtml(code, { lang: validLang, theme })
  } catch (e) {
    console.error('Shiki highlight error:', e)
    return escapeHtml(code)
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Pre-warm the highlighter on server start
async function init() {
  await getHighlighter()
  console.log('Shiki highlighter initialized')
}

module.exports = { highlight, init, getHighlighter }
```

### Phase 4: Integrate with Markdown Parser (1 hour)

Find the markdown-it configuration (likely in `app/lib/` or `app/server.js`).

**If using markdown-it:**

```javascript
// Before (highlight.js)
const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value
    }
    return ''
  }
})

// After (Shiki)
const shikiHighlighter = require('./lib/shiki-highlighter')

const md = require('markdown-it')({
  highlight: function (str, lang) {
    return shikiHighlighter.highlight(str, lang)
  }
})

// Initialize Shiki when server starts
shikiHighlighter.init()
```

**Alternative - use markdown-it-shiki plugin:**

```javascript
const MarkdownIt = require('markdown-it')
const Shiki = require('@shikijs/markdown-it').default

async function createMarkdownRenderer() {
  const md = MarkdownIt()
  await md.use(await Shiki({ theme: 'monokai' }))
  return md
}
```

### Phase 5: Handle Theme Selection (30 min)

Read theme from Neovim config (the plugin already reads `mkdp_theme`):

```javascript
// In server.js or wherever config is read
const theme = await plugin.nvim.getVar('mkdp_theme') // 'dark' or 'light'
const shikiTheme = theme === 'dark' ? 'monokai' : 'github-light'
```

Optionally add a new config variable `mkdp_shiki_theme`:

```lua
-- In user's init.lua
vim.g.mkdp_shiki_theme = 'monokai'  -- or 'github-dark', 'dracula', etc.
```

### Phase 6: Build & Test (30 min)

```bash
cd app/

# Install dependencies
npm install

# Build (if needed)
npm run build

# Test locally - open a markdown file in Neovim and run :MarkdownPreview
```

### Phase 7: Cleanup (15 min)

1. Remove highlight.js dependency if no longer needed:
   ```bash
   npm uninstall highlight.js
   ```

2. Remove `app/_static/highlight.css` (Shiki inlines styles or uses its own)

3. Update README with new features

4. Commit and push to fork

---

## Lazy.nvim Configuration

Update `init.lua` to use the fork:

```lua
{
  "sdbuch/markdown-preview.nvim",  -- Use fork instead of "iamcco/markdown-preview.nvim"
  cmd = { "MarkdownPreviewToggle", "MarkdownPreview", "MarkdownPreviewStop" },
  ft = { "markdown" },
  build = function()
    vim.fn["mkdp#util#install"]()
  end,
  config = function()
    vim.g.mkdp_theme = "dark"
    vim.g.mkdp_shiki_theme = "monokai"  -- New option (after implementation)
    vim.g.mkdp_preview_options = {
      sync_scroll_type = "middle",
      disable_sync_scroll = 0,
      hide_yaml_meta = 1,
      mkit = {},
      katex = {},
      mermaid = {},
      disable_filename = 0,
    }
    vim.g.mkdp_combine_preview = 1
    vim.g.mkdp_combine_preview_auto_refresh = 1
    vim.g.mkdp_auto_close = 0

    vim.api.nvim_create_autocmd("FileType", {
      pattern = "markdown",
      callback = function()
        vim.keymap.set("n", "<Leader>mdtp", "<Plug>MarkdownPreviewToggle")
      end,
    })
  end,
},
```

---

## Files to Examine First

When starting implementation, read these files to understand the architecture:

1. `app/package.json` - see current dependencies
2. `app/server.js` - main server, see how requests are handled
3. `app/lib/` - find markdown rendering code
4. `app/pages/` - Next.js pages, see how content is displayed
5. `app/routes.js` - routing logic

```bash
# Quick command to find highlight.js usage
cd ~/path/to/fork/markdown-preview.nvim
grep -rn "hljs\|highlight" app/ --include="*.js" | head -30
```

---

## Resources

- [Shiki documentation](https://shiki.matsu.io/)
- [Shiki GitHub](https://github.com/shikijs/shiki)
- [markdown-it-shiki](https://github.com/shikijs/markdown-it-shiki)
- [VS Code TextMate grammars](https://github.com/microsoft/vscode-textmate)
- [markdown-preview.nvim source](https://github.com/iamcco/markdown-preview.nvim)

---

## Estimated Total Time

| Phase | Time |
|-------|------|
| Setup & Exploration | 30 min |
| Add Shiki | 15 min |
| Create Highlighter Module | 30 min |
| Integrate with Markdown Parser | 1 hour |
| Handle Theme Selection | 30 min |
| Build & Test | 30 min |
| Cleanup | 15 min |
| **Total** | **~3.5 hours** |
