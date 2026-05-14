# CLAUDE.md

> Project context for Claude Code. The agent reads this file before any
> interaction with this repository. `AGENTS.md` is an alias pointing here.

---

## Project at a glance

`mitto-ai-presentation` is a presentation app that renders its own slides
and exposes a small feature alongside. See `README.md` for the full project
description, stack, structure, and commands.

**Hard constraints for this repo:**
- No database, no auth, no external services — in-memory storage only
- No background jobs, websockets, or message queues
- TypeScript across the stack, strict mode, no `any` (except boundaries with
  untyped third-party code)
- Optimize for clarity over cleverness — code should be obvious on first read

---

## Workflow (mandatory for non-trivial work)

Every feature, refactor, or significant fix flows through this six-step
cycle. Small one-line bug fixes can skip steps 1–2; everything else does
the full loop.

### 1. Brainstorm — `/superpowers:brainstorming`
Triggers a structured Q&A with the agent. The agent asks one question at
a time to refine intent before any code is written. Goal: surface
requirements, edge cases, and the simplest viable scope.

### 2. Plan — `/superpowers:writing-plans`
The agent writes a plan document to `docs/plans/YYYY-MM-DD-<topic>.md`. The
plan lists files to change, the strategy, tests, and risks. The plan is
reviewed (by you) before any code changes.

### 3. Execute — choose one
- **Parallel (preferred for multi-layer work):**
  `/superpowers:subagent-driven-development` — dispatches independent
  subagents per task in the plan (e.g. backend, frontend, e2e). Faster, and
  each subagent has a focused context window.
- **Main agent (preferred for single-layer or tightly-coupled work):**
  Continue in the current session, work through the plan step by step.

### 4. Simplify — `/simplify` skill
After implementation, run `/simplify` to look for duplicated code, dead
helpers, premature abstractions, redundant state, and one-shot wrappers.
Apply small fixes inline; flag judgement calls.

### 5. Review — code-reviewer subagent
Dispatch the `code-reviewer` subagent with a pointer to the plan and a
brief of what changed. It reviews against project conventions in this file
and against the plan. Treat its findings the way you'd treat a senior
colleague's PR review.

### 6. Document — update `CLAUDE.md`, `README.md`, `docs/`
- Did you add a new command, script, or tool? Update `README.md`.
- Did you encode a new lesson the agent should follow? Update the relevant
  rule section here.
- Did you change behaviour future contributors need to know about?
  Update `docs/`.

---

## Code conventions

### Frontend (Angular 21)
- Use Angular Material first; custom components only when Material doesn't fit
- Standalone components (this is the Angular 21 default; no NgModules)
- Signals for state, `OnPush` change detection by default
- Reactive forms over template-driven
- File naming follows Angular 21 convention: `*.ts` not `*.component.ts`
- One slide = one standalone component under `apps/web/src/app/slides/`

### Backend (Node + Express + TypeScript)
- Routes are thin: parse → validate → service → respond. No logic in routes.
- Validators in `server/src/validators/`, return
  `{ ok: true; value } | { ok: false; errors }`. Never throw for validation.
- Services in `server/src/services/`. Pure where possible.
- In-memory storage in `server/src/data/`. Reset on process restart by design.
- Error response shape is uniform: `{ error: { message: string, details?: unknown } }`

### Testing
- Every new feature: unit tests for logic, integration test for new routes,
  one Playwright e2e for the main user flow
- Vitest (not Jest — Angular 21's `@angular/build:unit-test` uses Vitest)
- Coverage targets: **80%+ backend**, **70%+ frontend**
- No `setTimeout`-based waits in unit tests; no `page.waitForTimeout()` in
  Playwright. Use fake timers (`vi.useFakeTimers()`) and proper auto-waits.

### TypeScript and exports
- Strict mode. No `any` unless the boundary is genuinely untyped.
- Named exports only. No default exports.
- One short comment line max. Default to no comments. Only add for non-obvious
  *why* (hidden constraint, subtle invariant, workaround). Never narrate WHAT
  the code does — names already do that.

---

## What you must NOT do

- Do not add a database, ORM, auth, websockets, or external services
- Do not introduce abstractions or design patterns "for the future"
- Do not delete tests because they fail; fix the cause
- Do not silently rename files or move folders without saying so
- Do not write multi-paragraph comments or `// removed` placeholders
- Do not bypass validation or git hooks (`--no-verify`)
- Do not weaken coverage thresholds to make a build pass
- Do not regenerate `apps/web/src/app/slides/slide-06-results/results.data.ts`
  from any branch other than `demo-finished` (canonical numbers come from
  there; running on `main` would write lower values and break the slide-6
  visual snapshot baseline)
- Do not deploy to Render without verifying tests pass first. Always run
  `npm run preshow` (or at minimum `npm test && npm run build`) and ship
  only on green. Render auto-deploys on push to `demo-finished`, so a
  broken push goes live in ~3 minutes.

---

## Code style notes

- Long expressions and clever one-liners hurt comprehension; prefer obvious
  code.
- Predictable patterns over advanced abstractions. All routes look alike.
  All slides look alike.
- Final summaries are 2–3 plain sentences, not a wall of bullets.
- When invoked through `superpowers:subagent-driven-development`, prefer
  parallelism for genuinely independent tasks.
- Slide numbering is load-bearing (slide 6 = Results, etc.). If you renumber
  slides, update `apps/web/src/app/slides/slide.config.ts`,
  `slides.routes.ts`, and every `docs/presentation/*.md` reference in the
  same commit.

---

## Definition of done

A change is done when:

1. Code compiles and lints
2. Tests run and pass (unit + integration + e2e where applicable)
3. Coverage at or above target
4. There is a final summary listing changed files and any risks
5. The diff is reviewable — no unrelated changes mixed in
6. `CLAUDE.md`, `README.md`, and relevant `docs/` are updated if behavior or
   commands changed (workflow step 6)
7. Visual regression baselines updated and committed if intentional UI
   changes were made: `npm --workspace e2e run test -- --update-snapshots`

---

## References
- `README.md` — project description, stack, structure, commands
- `docs/plans/` — past plans the agent has written
