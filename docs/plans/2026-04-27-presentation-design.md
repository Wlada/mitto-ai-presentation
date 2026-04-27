# Presentation Design — Claude Code in Practice

**Date:** 2026-04-27
**Author:** Vladimir Bujanovic
**Status:** Validated design (brainstormed)
**Duration:** 30 minutes
**Language:** Presentation in English; internal/personal notes in Serbian

---

## 1. Goal and Audience

### Audience
Mixed technical team — developers, QA, tech leads. Familiar with full-stack development, not necessarily familiar with Claude Code or AI agent workflows.

### Primary goals
1. **Evaluation** — give the team enough information to decide whether to adopt Claude Code in their workflow.
2. **Education** — show what is realistically possible today, including limitations.

### Central message
> The value isn't agent autonomy — it's a faster, controlled, repeatable engineering process where the developer remains the owner.

### What the audience should leave with
- **Conceptual:** Claude Code is an orchestrator + skills + subagents + project context (`CLAUDE.md`). Different from autocomplete.
- **Practical:** What one realistic feature delivery cycle looks like — from request to plan to parallel execution to tests.
- **Process:** What humans must decide, what agents can do alone, where the risks are.
- **Starting point:** What the team can try tomorrow (one `CLAUDE.md`, one skill, plan-mode).

### What we are NOT trying to do
- Sell "replace the developer"
- Show off speed ("look how fast it wrote 500 lines")
- Plug branding ("our plugin is the best")
- Claim production-readiness out of the box

---

## 2. Application Architecture

### The "meta" idea
The application that **renders the slides** is the **same application** the agent works on during the live demo. Audience sees this directly: slides and demo features share the repo, the `CLAUDE.md`, the test suite.

### Stack
| Layer | Choice |
|-------|--------|
| Frontend | Angular (latest stable) + Angular Material + Router |
| Backend | Node.js + Express + TypeScript |
| Storage | In-memory (Map / array in service). No database. |
| Frontend tests | Jest (Angular preset) — final choice at setup time |
| Backend tests | Vitest or Jest + Supertest |
| E2E | Playwright |
| Coverage | Built-in from Jest/Vitest |
| Slide rendering | Native Angular components, one slide per component, Router-based navigation |
| Workspace | npm workspaces (no Nx/Turborepo) |

### Repository structure
```
mitto-ai-presentation/
├── CLAUDE.md                    # canonical project context
├── AGENTS.md                    # alias / pointer to CLAUDE.md
├── README.md
├── package.json                 # workspaces root
├── apps/
│   └── web/                     # Angular app (slides + demo features)
│       ├── src/app/
│       │   ├── slides/          # one component per slide
│       │   ├── feedback/        # Q&A demo feature (pre-built)
│       │   ├── shared/
│       │   └── core/
│       └── tests/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── data/
│   └── tests/
├── e2e/
│   └── feedback.spec.ts
├── docs/
│   ├── plans/
│   ├── presentation/
│   └── setup/
└── .claude/
    ├── settings.json            # hooks (optional)
    └── plugins/                 # superpowers plugin reference
```

### Three repo states
- `main` — initial stable state (slides + skeleton + one existing page)
- `demo-finished` branch — complete Q&A feature with all tests
- Local working tree during the live presentation

---

## 3. Demo Feature — Audience Q&A

### User story
> As a presenter, I want the audience to submit questions and feedback during the talk, displayed in near real-time on a separate page.

### Frontend (`apps/web/src/app/feedback/`)
- `/feedback/submit` — form with `name?`, `type` (question | comment | suggestion), `message` (required, ≤500 chars), Material validation, snackbar feedback
- `/feedback/list` — sorted desc, filter chip by `type`, polling every 3s
- `/feedback` redirects to `/feedback/submit`

### Backend (`server/src/routes/feedback.ts`)
- `POST /api/feedback` — validates, stores in `FeedbackService`, returns entry with `id` and `createdAt`
- `GET /api/feedback` — returns all entries desc, optional `?type=` filter
- Validation: enum check on `type`, length checks on `message` and `name`
- 400 with error list for validation failures, 201 for success

### Tests
| Type | File | Coverage |
|------|------|----------|
| Backend unit | `feedbackValidator.spec.ts` | All validation branches |
| Backend unit | `feedbackService.spec.ts` | add, list, filter |
| Backend integration | `feedback.route.spec.ts` | Supertest, happy path + 400 cases |
| Frontend unit | `feedback-form.component.spec.ts` | Form valid/invalid states |
| Frontend unit | `feedback-list.component.spec.ts` | Render, filter, empty state |
| E2E | `feedback.spec.ts` | Submit → navigate → see entry |

**Coverage targets:** 80%+ backend, 70%+ frontend.

### Size
~15-20 file changes — large enough to justify parallel subagents, small enough to keep clean.

---

## 4. Time Allocation (30 min)

| Time | Section | Content |
|------|---------|---------|
| 0–3 | Intro | Goal, agenda, who I am |
| 3–6 | Concept | What Claude Code is + superpowers concept (1-2 slides) |
| 6–10 | Repo tour | Architecture, `CLAUDE.md`, skills folder, brief code walk |
| 10–20 | **Live flow** | Feature request → brainstorm → plan → subagent dispatch → STOP |
| 20–25 | Pre-built result | Diff, code-reviewer subagent, tests, coverage |
| 25–30 | Limits + Q&A | Where it fails, recommended team model, questions |

---

## 5. Live Demo Flow (the 10–20 min block)

### Starting state
- On `main` branch (or `demo-start` tag)
- Terminal open in repo, Angular dev server running in another terminal
- Slides open in the browser

### Step-by-step

**10:00–10:30 — Setup line.** Tell the audience: *"I'll actually run Claude Code on a real feature. To stay realistic, I won't wait for everything to finish — I'll show the plan and dispatch, then jump to the result."*

**10:30–12:00 — Feature request prompt.** Paste prepared prompt invoking `/superpowers:brainstorming` for the audience feedback feature.

**12:00–14:30 — Brainstorm Q&A.** Skill asks 4-5 questions one at a time. You answer. Audience sees agent doesn't assume — it asks.

**14:30–16:00 — Plan generation.** Skill transitions to `/superpowers:writing-plans`. The plan document writes live to `docs/plans/`. Narrate while it writes.

**16:00–18:30 — Subagent dispatch.** Run `/superpowers:subagent-driven-development`. Skill dispatches parallel subagents (backend, frontend form, frontend list, integration test, e2e). Audience sees the task list and live status.

**18:30–20:00 — STOP and switch.** Say: *"This would take 8-10 more minutes. I ran it yesterday — let me show you the result."* `git checkout demo-finished`.

### Skills used (showcased)
- `superpowers:brainstorming`
- `superpowers:writing-plans`
- `superpowers:subagent-driven-development`
- `code-reviewer` (later, in result section)
- `simplify` (optional bonus segment)

---

## 6. Pre-built Result (20–25 min)

### Step-by-step

**20:00–21:00 — Diff overview.** `git diff main..demo-finished --stat`. Open one file (e.g., `feedbackValidator.ts`). Comment on cleanliness, no out-of-scope churn.

**21:00–22:30 — Code-reviewer subagent live.** Run code-reviewer subagent over the diff. Returns observations. Frame: *"This is a separate Claude that didn't write the code — independent review, like a senior colleague. Could be your pre-PR step."*

**22:30–24:00 — Run tests.** `npm test` (unit + integration). `npm run e2e` (Playwright opens browser, walks the feedback flow).

**24:00–25:00 — Coverage.** Open generated `coverage/index.html`. Show numbers. Frame: *"Not a goal in itself, but indicates the agent didn't skip tests."*

**Bonus (if time permits):** `/simplify` skill on a deliberately cluttered file. 30 seconds, visually striking.

---

## 7. Deliverables (the artifacts I produce)

```
docs/
├── plans/
│   └── 2026-04-27-presentation-design.md   # this document
├── presentation/
│   ├── 01-overview.md                       # high-level prep doc
│   ├── 02-slide-content.md                  # text per slide (EN) + speaker notes (SR)
│   ├── 03-presenter-cheatsheet.md           # ⭐ next-to-laptop reminder
│   ├── 04-prepared-prompts.md               # exact prompts to paste live
│   ├── 05-fallback-plan.md                  # what to do if it breaks
│   └── 06-rehearsal-checklist.md            # 3-4 practice runs
└── setup/
    ├── 01-repo-setup.md                     # how to bootstrap, install, run
    ├── 02-claude-md-template.md             # CLAUDE.md content
    └── 03-demo-finished-build.md            # how to produce demo-finished branch
```

The cheatsheet is the most important document — A4-printable, one page per phase, includes what you say, what you do, and the fallback plan in one line.

---

## 8. Risks and Fallbacks

| Risk | Mitigation |
|------|------------|
| Live agent stalls during brainstorm | Have prepared answers; cut short and say "in the interest of time, I'll move on" |
| Subagent dispatch fails | Show pre-saved plan document instead; jump directly to `demo-finished` |
| Dev server crashes mid-demo | Have screencast of working feature as backup |
| Tests fail unexpectedly on `demo-finished` | Pre-record `npm test` output as backup terminal scrollback |
| Code-reviewer subagent slow | Cap to 60s, then say "these usually run async — would be in your CI" |
| Time runs over | Skip `/simplify` bonus, skip code-reviewer; both are optional |

### The non-negotiable rule
If anything is going badly past minute 20, **immediately** switch to `demo-finished` and the result section. The audience came for the workflow story, not for live magic.

---

## 9. Preparation Plan

| When | What |
|------|------|
| Week 1 | Repo skeleton, `CLAUDE.md`, slides shell, basic Q&A pages, install superpowers |
| Week 2 | Build `demo-finished` (run the actual workflow once for real, save the output), wire all tests, verify Playwright |
| Week 3 | Write all slides content, write cheatsheet, write prepared prompts |
| Week 4 | 3 full rehearsals with stopwatch; trim what's slow; finalize fallback plan |

---

## 10. Open Decisions (to resolve at setup time)

- Final pick: Jest vs Vitest for backend (preference: Vitest for speed)
- Final pick: Jest+jest-preset-angular vs Karma+Jasmine for frontend (preference: Jest)
- Coverage tool: built-in vs `nyc` unified
- Whether to include hooks (`.claude/settings.json`) demo — currently OUT of scope
- Whether to mention MCP servers — currently OUT of scope
