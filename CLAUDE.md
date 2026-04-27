# CLAUDE.md

> Project context for Claude Code. This is the canonical source of truth for how
> to work on this repository. `AGENTS.md` is an alias pointing here.

---

## Project overview

**Name:** `mitto-ai-presentation`

A presentation application that demonstrates how Claude Code delivers full-stack
features through a disciplined workflow. The application serves two purposes
simultaneously:

1. **It renders the slides** of the presentation itself (Angular components,
   Router-based navigation).
2. **It is the demo target** — Claude Code adds and modifies features in this
   same repository while the audience watches.

This "meta" structure means the codebase the agent works on during the live
demo is the same codebase rendering the slides behind the demo.

The presentation is **30 minutes**, audience is a **mixed technical team**
(developers, QA, tech leads), and the central message is:

> The value isn't agent autonomy — it's a faster, controlled, repeatable
> engineering process where the developer remains the owner.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Frontend | Angular (latest stable) + Angular Material + Router |
| Backend | Node.js + Express + TypeScript |
| Storage | In-memory (no database) |
| Frontend tests | Vitest (built-in via `@angular/build:unit-test`, Angular 21 default) |
| Backend tests | Vitest + Supertest |
| E2E | Playwright |
| Coverage | Vitest built-in (`--coverage`, v8 provider) |
| Workspace | npm workspaces |
| Language across the stack | TypeScript |

Do not introduce a database, ORM, authentication library, websockets, message
queue, or any external service. Storage is in-memory by design.

---

## Repository structure

```
mitto-ai-presentation/
├── CLAUDE.md                  # this file
├── AGENTS.md                  # alias → CLAUDE.md
├── README.md
├── package.json               # workspaces root
├── apps/
│   └── web/                   # Angular app
│       ├── src/app/
│       │   ├── slides/        # one component per slide
│       │   ├── feedback/      # demo feature (Audience Q&A)
│       │   ├── shared/        # shared components, types
│       │   └── core/          # services, http clients, guards
│       └── tests/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── data/              # in-memory stores
│   └── tests/
├── e2e/                       # Playwright specs
├── docs/
│   ├── plans/                 # design docs, plan-first artifacts
│   ├── presentation/          # slide content, cheatsheet, prompts
│   └── setup/                 # bootstrap and build guides
└── .claude/
    ├── settings.json
    └── plugins/               # superpowers plugin reference
```

Keep the structure flat. Do not add intermediate folders unless they
materially improve navigation.

---

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install all workspace dependencies |
| `npm run dev` | Run Angular and Express concurrently (frontend on :4200, backend on :3000) |
| `npm run dev:web` | Run only Angular |
| `npm run dev:server` | Run only Express |
| `npm run build` | Build all workspaces for production |
| `npm test` | Run unit + integration tests across all workspaces |
| `npm run test:web` | Frontend tests only |
| `npm run test:server` | Backend tests only |
| `npm run e2e` | Run Playwright tests (requires dev server running, or use `e2e:ci`) |
| `npm run e2e:ci` | Start dev server, run Playwright, then shut down |
| `npm run coverage` | Run all tests with coverage; output to `coverage/` |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Run Prettier across the repo |

Always verify a command works before claiming it does. If a script does not
exist, add it explicitly to `package.json` rather than assuming.

---

## Workflow rules (most important section)

### Plan first, code second

Before editing code, always:

1. Read the relevant parts of the repository and `CLAUDE.md`.
2. Summarize what you understand the task to be in your own words.
3. Propose a short implementation plan (sections, files, steps).
4. List the files you expect to create or modify.
5. Call out any risks, assumptions, or open questions.

Only after this — and after confirmation when working interactively — start
making changes. For bigger features, write the plan to
`docs/plans/YYYY-MM-DD-<topic>.md` so it survives the conversation.

### Small, focused diffs

- Prefer the smallest change that solves the problem.
- Do not bundle refactors with features. Bug fixes do not need surrounding
  cleanup.
- Three similar lines is better than a premature abstraction.
- Do not introduce new dependencies unless clearly necessary.

### After changes

1. Run the relevant tests for the area you changed.
2. Fix anything you broke.
3. Provide a final summary listing changed files and any risks or follow-ups.

### What you must NOT do

- Do not add a database, auth, or external service.
- Do not introduce abstractions or design patterns "for the future."
- Do not delete tests because they fail; fix the cause.
- Do not silently rename files or move folders without saying so.
- Do not write large multi-paragraph comments. One short line max.
- Do not add `// removed` or `// previously` placeholder comments.
- Do not bypass validation or hooks (`--no-verify`).

---

## Frontend rules (Angular)

- Use Angular Material components first. Custom components only when Material
  cannot express what is needed.
- Components should be small and single-purpose. If a template approaches 100
  lines, decompose.
- Services for state and HTTP. Components consume services; they do not own
  business logic.
- Strongly type everything. No `any` unless coming from an untyped third-party
  source.
- Reactive forms over template-driven forms.
- Routes are declarative in the routing module — avoid imperative
  `router.navigate` for primary navigation.

### Slide components

Each slide is its own component under `apps/web/src/app/slides/`. Slides are
plain components — they render content and (optionally) demo widgets. Slide
navigation uses the Router (`/slides/:n`).

When asked to add a new slide:
1. Create `slide-NN-name.component.ts` (number prefixed for ordering).
2. Register it in `slides.routes.ts`.
3. Update the slide registry/index.

### Branding

The brand is **Mitto** (https://mitto.ch). Visual style is **clean, minimal,
sans-serif**. Primary palette: white background, dark navy/charcoal text,
muted accents. Do not introduce playful or decorative elements unless asked.

---

## Backend rules (Express + TypeScript)

- Routes are thin: parse → validate → call service → respond.
- Validators live in `server/src/validators/`. They return a structured result
  `{ ok: true, value } | { ok: false, errors }` — never throw for validation.
- Services live in `server/src/services/`. Pure functions where possible;
  inject dependencies through constructor or function parameters for
  testability.
- Data layer is in-memory (`server/src/data/`). Use Map or array. Reset on
  process restart by design.
- Error responses have a consistent shape: `{ error: { message, details? } }`.
- Use HTTP status codes correctly: 200, 201, 400, 404, 500.

---

## Testing rules

Every new feature must include:

- **Unit tests** for any non-trivial logic (validators, services, components).
- **Integration test** for any new backend route (Supertest).
- **One Playwright e2e test** for the main user flow if the feature has UI.

Coverage targets: **80%+ backend**, **70%+ frontend**. If a change drops
coverage below the target, either add tests or explain in the summary why
the new code is not testable.

Tests must be deterministic. No `setTimeout`-based waits in unit tests. In
Playwright, use locators and `expect(...).toBeVisible()`-style waits, never
arbitrary `page.waitForTimeout()`.

---

## Demo behavior (presentation context)

This repository is used in a live presentation. When working in this codebase
during the demo:

- **Optimize for clarity over cleverness.** The audience reads the code on
  screen. Long expressions and clever one-liners hurt comprehension.
- **Predictable patterns over advanced abstractions.** Use the same shape
  across files (e.g., all routes look alike).
- **Explain trade-offs in the final summary** in 2-3 plain sentences, not as
  a wall of bullet points.
- **Time matters.** When invoked through `superpowers:subagent-driven-development`,
  prefer parallelism over sequential work.

---

## Definition of done

A change is done when:

1. The code compiles and lints.
2. Tests run and pass (unit + integration + e2e where applicable).
3. Coverage is at or above target.
4. There is a final summary listing changed files and any risks.
5. The diff is reviewable — no unrelated changes mixed in.

---

## References

- Design document: `docs/plans/2026-04-27-presentation-design.md`
- Slide content: `docs/presentation/02-slide-content.md`
- Presenter cheatsheet: `docs/presentation/03-presenter-cheatsheet.md`
- Prepared prompts: `docs/presentation/04-prepared-prompts.md`
- Fallback plan: `docs/presentation/05-fallback-plan.md`
- Repo setup: `docs/setup/01-repo-setup.md`
