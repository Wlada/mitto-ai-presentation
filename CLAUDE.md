# CLAUDE.md

> Project context for Claude Code. The agent reads this file before any
> interaction with this repository. `AGENTS.md` is an alias pointing here.
>
> This file is **also a demo artifact** — the audience reads it on screen
> during the presentation. Keep it scannable, opinionated, and honest about
> trade-offs.

---

## What this file is and how to maintain it

A `CLAUDE.md` (also recognized as `AGENTS.md`) is the **standing context** the
agent uses every time it touches the repo. Think of it as a permanent prompt
prefix that does not consume your conversation context window.

### What belongs here
- **Project-specific rules** — conventions a new contributor would need a
  human to explain (which lint preset, in-memory storage, no auth, etc.)
- **Workflow expectations** — the steps every non-trivial task goes through
- **Code style per layer** — short bullets the agent will treat as ground truth
- **What NOT to do** — guardrails to prevent past mistakes from recurring
- **Definition of done** — the checklist the agent self-evaluates against
- **Demo / context-specific behaviors** — instructions that depend on usage
  (e.g. "this is a demo, optimize for clarity")

### What does NOT belong here
- **Project description, stack table, install commands** — those live in
  `README.md` (humans read that). Agents don't need a 5-paragraph intro.
- **Generated artifacts** (test counts, coverage numbers, file inventories) —
  use scripts (`npm run results:refresh`) or `git`/`grep` to derive these
- **Anything that drifts** — every line you add is a maintenance liability.
  If a fact rots over time, prefer a script that recomputes it.

### Maintenance discipline (important)
- **Outdated `CLAUDE.md` is worse than none.** Stale rules teach the agent
  the wrong patterns and the audience starts ignoring it.
- After every meaningful change to the repo, ask: *"Does any rule in
  `CLAUDE.md` need updating?"* If yes, update in the same commit.
- The "What you must NOT do" section often grows after a bad agent
  interaction. That is correct — encode the lesson.
- For a step-by-step on adapting this template to a new repo, see
  `docs/setup/02-claude-md-template.md`.

---

## Project at a glance

`mitto-ai-presentation` is a 30-minute presentation app that **renders the
slides** and is **simultaneously the demo target** the agent works on during
the live talk. The audience sees the same Angular components evolve in real
time during the live demo. See `README.md` for the full project description,
stack, structure, and commands.

**Hard constraints for this repo:**
- No database, no auth, no external services — in-memory storage only
- No background jobs, websockets, or message queues
- TypeScript across the stack, strict mode, no `any` (except boundaries with
  untyped third-party code)
- Optimize for **clarity over cleverness** — the audience reads the code on
  screen during the talk

---

## Workflow (mandatory for non-trivial work)

Every feature, refactor, or significant fix flows through this six-step
cycle. Small one-line bug fixes can skip steps 1–2; everything else does
the full loop.

### 1. Brainstorm — `/superpowers:brainstorming`
Triggers a structured Q&A with the agent. The agent asks one question at
a time to refine intent before any code is written. Goal: surface
requirements, edge cases, and the simplest viable scope.

> **Why first.** Most failed agent runs are wrong assumptions made silently.
> Brainstorming forces them into the open.

### 2. Plan — `/superpowers:writing-plans`
The agent writes a plan document to `docs/plans/YYYY-MM-DD-<topic>.md`. The
plan lists files to change, the strategy, tests, and risks. The plan is
reviewed (by you) before any code changes.

> **Why a file.** Plans survive the conversation. If you `/clear`, the plan
> is still there. New conversations can pick it up. Reviewers can read it
> before approving the diff.

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

> **Why after, not before.** Simplification needs working code to evaluate.
> Premature simplification deletes things you need.

### 5. Review — code-reviewer subagent
Dispatch the `code-reviewer` subagent with a pointer to the plan and a
brief of what changed. It reviews against project conventions in this file
and against the plan. Treat its findings the way you'd treat a senior
colleague's PR review.

### 6. Document — update `CLAUDE.md`, `README.md`, `docs/`
- Did you add a new command, script, or tool? Update `README.md` and the
  command table here.
- Did you encode a new lesson the agent should follow? Update the relevant
  rule section here.
- Did you change behaviour the audience or future contributors need to
  know about? Update `docs/`.

> **Why last.** Docs that get written before the code lie. Docs that get
> written after the code, in the same commit, stay accurate.

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
- Do not regenerate `apps/web/src/app/slides/slide-08-results/results.data.ts`
  from any branch other than `demo-finished` (canonical numbers come from
  there; running on `main` would write lower values and break the slide-8
  visual snapshot baseline)

---

## Demo behavior (this repo is used in a live talk)

- Code is read on screen at projector resolution. Long expressions and clever
  one-liners hurt comprehension live.
- Predictable patterns over advanced abstractions. All routes look alike. All
  slides look alike.
- Final summaries are 2–3 plain sentences, not a wall of bullets.
- When invoked through `superpowers:subagent-driven-development`, prefer
  parallelism. The audience sees the dispatch fan out — that's part of the
  demo's value.
- Slide numbering is load-bearing (slide 8 = Results, etc.). If you renumber
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

## Commands you'll actually use

| Command | What it does |
|---------|--------------|
| `npm run dev` | Frontend (:4300) + backend (:3000), concurrently |
| `npm test` | Unit + integration tests across workspaces |
| `npm run e2e` | Playwright (functional + visual regression) |
| `npm run coverage` | HTML coverage reports under `*/coverage/` |
| `npm run results:refresh` | Regenerate Slide 8 numbers (run on `demo-finished`) |
| `npm run preshow` | One-shot preflight for the live presentation |

For the full table see `README.md`.

---

## References
- `README.md` — project description, stack, structure, full command table
- `docs/plans/` — past plans the agent has written
- `docs/presentation/` — slide content, presenter cheatsheet, prompts, fallback
- `docs/setup/02-claude-md-template.md` — how to write a CLAUDE.md for a new repo
