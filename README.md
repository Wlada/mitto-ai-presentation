# mitto-ai-presentation

A 30-minute presentation application that demonstrates how Claude Code delivers
full-stack features through a disciplined workflow. The application **renders
the slides** of the presentation itself and serves as the **live demo target**
the agent works on. The audience watches the same Angular components evolve
during the talk.

**Live demo:** <https://presentation.vladimirbujanovic.com> (deployed from
`demo-finished` to Render free tier; first request after 15 min idle has a
~30 s cold start — the [pre-show script](./scripts/pre-show.sh) warms it up).

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | Angular 21 + Angular Material, signals, zoneless change detection |
| Backend | Node.js 22 + Express 5 + TypeScript |
| Storage | In-memory (no database) |
| Frontend tests | Vitest (`@angular/build:unit-test`, Angular 21 default) |
| Backend tests | Vitest + Supertest |
| E2E | Playwright (functional + visual regression) |
| Coverage | Vitest built-in (v8 provider) |
| Workspace | npm workspaces (no Nx/Turborepo) |

## Quick start

```bash
npm install              # installs all workspaces
npx playwright install   # one-time, downloads Chromium for e2e
npm run dev              # runs frontend (:4300) and backend (:3000) concurrently
```

Open <http://localhost:4300/slides/1> in the browser.

## Workflow

This repo is built and maintained through a six-step Claude Code workflow.
Each non-trivial change goes through:

1. **Brainstorm** — `/superpowers:brainstorming`
2. **Plan** — `/superpowers:writing-plans` (writes to `docs/plans/`)
3. **Execute** — `/superpowers:subagent-driven-development` (parallel) or main agent
4. **Simplify** — `/simplify` skill on changed code
5. **Review** — `code-reviewer` subagent against the plan and conventions
6. **Document** — update `CLAUDE.md`, `README.md`, and `docs/`

Full workflow rules and constraints are in [`CLAUDE.md`](./CLAUDE.md).

The prepared prompts that drive the live demo are in
[`docs/presentation/04-prepared-prompts.md`](./docs/presentation/04-prepared-prompts.md).

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Frontend (:4300) + backend (:3000), concurrently |
| `npm run dev:web` | Only Angular |
| `npm run dev:server` | Only Express |
| `npm run build` | Production build of frontend + backend |
| `npm test` | Unit + integration across workspaces (does not include e2e) |
| `npm run test:web` | Only frontend tests |
| `npm run test:server` | Only backend tests |
| `npm run e2e` | Playwright (functional + visual regression) |
| `npm run e2e:install` | One-time: install Chromium for Playwright |
| `npm run coverage` | HTML coverage reports under `apps/web/coverage/` and `server/coverage/` |
| `npm run results:refresh` | Regenerate Slide 6 numbers (run only on `demo-finished`) |
| `npm run preshow` | One-shot preflight before going live |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Prettier across the repo |

## Repository layout

```
mitto-ai-presentation/
├── CLAUDE.md                  # canonical project context for AI agents
├── AGENTS.md                  # alias → CLAUDE.md
├── README.md                  # this file
├── package.json               # npm workspaces root
├── apps/
│   └── web/                   # Angular 21 app — slides + demo features
│       ├── src/app/
│       │   ├── slides/        # one component per slide (10 slides)
│       │   ├── feedback/      # Audience Q&A demo feature (demo-finished branch)
│       │   ├── core/
│       │   └── shared/
│       └── proxy.conf.json
├── server/                    # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── types/
│   │   └── data/
│   └── vitest.config.ts
├── e2e/                       # Playwright tests + visual baselines
│   ├── tests/
│   └── tests/slides-visual.spec.ts-snapshots/   # visual regression baselines
├── scripts/                   # maintenance and pre-show automation
│   ├── refresh-results.mjs    # regenerate Slide 6 numbers from coverage
│   └── pre-show.sh            # 10-min preflight before going live
├── docs/
│   ├── plans/                 # plan documents written during workflow step 2
│   ├── presentation/          # slide content, cheatsheet, prompts, fallback
│   └── setup/                 # repo bootstrap and CLAUDE.md template
└── .claude/                   # Claude Code project config and plugin references
```

Visual regression baselines live under
`e2e/tests/slides-visual.spec.ts-snapshots/`. Re-baseline with
`npm --workspace e2e run test -- --update-snapshots` after intentional UI
changes, then commit the new PNGs.

## Branches

- **`main`** — slides + scaffold + docs. The presenter's local working
  copy stays on this branch for the entire talk. Claude Code runs the
  live agent flow (brainstorm → plan → dispatch) here — the agent sees a
  fresh repo without the Q&A feature, so the brainstorm questions are
  meaningful.
- **`demo-finished`** — `main` + the full Audience Q&A feature with
  tests. **This is the branch deployed at the live URL.** The audience
  sees the finished state on the live URL throughout the talk; no
  `git checkout` happens mid-demo.

```
main             ◄── local: presenter runs Claude Code here
└─ demo-finished ◄── deployed: serves the live URL the audience sees
```

When the live agent flow finishes (around minute 18), the presenter just
shifts focus from the terminal to the browser tab on the live URL —
already showing the finished result — instead of swapping local branches.

## Ports

| Service | Port | Why |
|---------|------|-----|
| Angular dev server | **4300** | 4200 is often taken by other local Angular projects |
| Express backend | 3000 | Conventional Node port |

To change ports, update `apps/web/package.json` (`start` script),
`e2e/playwright.config.ts` (`baseURL` and `webServer.port`), and
`server/src/app.ts` (CORS origins).

## Pre-show

Before going live, run from the repo root:

```bash
npm run preshow
```

It checks branch, working tree, ports, dependencies, slide-6 data freshness,
runs all tests, and exits **READY TO PRESENT** or **NOT READY** with a
specific list of fixes.

## Documentation

- [Project context for AI agents](./CLAUDE.md)
- [Presentation design](./docs/plans/2026-04-27-presentation-design.md)
- [Repo setup guide](./docs/setup/01-repo-setup.md)
- [How to write a CLAUDE.md for any repo](./docs/setup/02-claude-md-template.md)
- [Deployment to Render + Cloudflare DNS](./docs/setup/04-deployment.md)
- [Slide content (audience-facing text)](./docs/presentation/02-slide-content.md)
- [Presenter cheatsheet](./docs/presentation/03-presenter-cheatsheet.md)
- [Prepared prompts (live demo)](./docs/presentation/04-prepared-prompts.md)
- [Fallback plan](./docs/presentation/05-fallback-plan.md)
- [Rehearsal checklist](./docs/presentation/06-rehearsal-checklist.md)

## License

Internal demo project. Not for redistribution.
