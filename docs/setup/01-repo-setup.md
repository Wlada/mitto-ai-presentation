# Repo Setup

> How this repository is bootstrapped from scratch. Useful if you're rebuilding
> in a fresh checkout, onboarding someone, or recreating the demo for another talk.

---

## Prerequisites

| Tool | Version | Verify |
|------|---------|--------|
| Node | ≥ 22.12.0 | `node --version` |
| npm | ≥ 10.9.0 | `npm --version` |
| git | any modern | `git --version` |
| Claude Code | latest | `claude --version` |

If Node or npm are too old, install with `nvm` or `volta`. Don't use the
system Node.

## First-time setup

```bash
git clone <your-repo-url> mitto-ai-presentation
cd mitto-ai-presentation
npm install            # installs all workspaces (~1-2 min)
npx --workspace e2e playwright install chromium    # one-time
npm test               # verify everything passes
npm run dev            # start frontend (:4300) + backend (:3000)
```

Open `http://localhost:4300/slides/1` to verify the slides render.

## Daily commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Frontend (:4300) + backend (:3000) concurrently |
| `npm run dev:web` | Only Angular |
| `npm run dev:server` | Only Express |
| `npm test` | Unit + integration tests across all workspaces |
| `npm run test:web` | Only frontend tests |
| `npm run test:server` | Only backend tests |
| `npm run e2e` | Playwright e2e (functional + visual regression, auto-starts dev server) |
| `npm run coverage` | Coverage reports for both workspaces |
| `npm run results:refresh` | Run coverage and regenerate Slide 6 numbers (`apps/web/src/app/slides/slide-06-results/results.data.ts`) |
| `npm --workspace e2e run test -- --update-snapshots` | Re-baseline visual regression snapshots after intentional UI changes |
| `npm run build` | Production build of frontend + backend |
| `npm run lint` | Lint all workspaces (best-effort) |
| `npm run format` | Prettier across the whole repo |

## Workspace structure

```
mitto-ai-presentation/
├── package.json                # workspaces root
├── apps/web/                   # Angular 21 frontend
│   ├── src/app/
│   │   ├── slides/             # one component per slide
│   │   ├── core/
│   │   └── shared/
│   ├── proxy.conf.json         # /api → :3000
│   └── angular.json
├── server/                     # Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── types/
│   │   └── data/
│   └── vitest.config.ts
├── e2e/
│   ├── tests/                 # functional + visual regression specs
│   │   └── slides-visual.spec.ts-snapshots/   # baseline screenshots
│   └── playwright.config.ts
├── scripts/
│   └── refresh-results.mjs    # regenerates Slide 6 results.data.ts
├── docs/
│   ├── plans/
│   ├── presentation/
│   └── setup/
└── CLAUDE.md                   # canonical project context
```

## Branches

```
main             ◄─── slides + scaffold + docs (presenter starts here)
└─ demo-finished ◄─── + Q&A feature (presenter switches here at minute 18)
```

To rebuild `demo-finished` from scratch (after re-doing the live workflow
or fixing a bug), see `03-demo-finished-build.md`.

## Port assignments

| Service | Port | Why this port |
|---------|------|---------------|
| Angular dev | **4300** | Avoids conflict with other local Mitto projects on 4200 |
| Express | 3000 | Conventional for Node/Express |

To change ports, update:
- `apps/web/package.json` → `start` script
- `e2e/playwright.config.ts` → `baseURL` and `webServer.port`
- `server/src/app.ts` → CORS origin

## Claude Code setup

The repo already includes:
- `CLAUDE.md` at the root — read by Claude Code automatically
- `AGENTS.md` as an alias for tooling that prefers that name
- `.claude/` for project-local Claude config (settings, plugin references)

To install superpowers plugin (if not already), follow Claude Code plugin
docs. The skills used in the live demo are:
- `superpowers:brainstorming`
- `superpowers:writing-plans`
- `superpowers:subagent-driven-development`
- `code-reviewer` (subagent)
- `simplify` (skill)

Verify they're available by running `claude` in the repo and checking the
skills list (Tab completion or `/help`).

## Common issues

### Port conflict on 4300

Another process is using 4300. Either kill it, or change to a different
port (see "Port assignments" above).

### `ng serve` fails to find `@angular/cli`

`npm install` didn't complete. Run from the repo root: `npm install`.

### Playwright can't find browsers

Run: `npx --workspace e2e playwright install chromium`

### Vitest fails with "Cannot use import statement outside a module"

The server uses ESM (`"type": "module"` in `server/package.json`). Make sure
you're using Node 22.12+ and that `tsconfig.json` has `"module": "NodeNext"`.

### The slides app shows the wrong content

You might be hitting another local dev server. Check `http://localhost:4300`
not `4200`. If 4300 is taken too, change `apps/web/package.json` start
script and update Playwright + CLAUDE.md to match.
