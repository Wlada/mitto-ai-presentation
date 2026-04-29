# Presenter Cheatsheet

> **Print this. Keep it next to your laptop.** A4 portrait, one phase per page
> ideally. Speaker notes in Serbian (for you), spoken lines in English.
>
> **Rule:** if anything goes wrong, you say *"Let me move on"* and skip to the
> next phase. Never apologize for skipping.

---

## Setup model (read once, internalize)

- **Local repo:** stays on `main` branch the whole time. Claude Code runs
  here for the live agent flow (brainstorm → plan → dispatch). You never
  `git checkout` mid-demo.
- **Live URL:** <https://presentation.vladimirbujanovic.com> serves the
  deployed `demo-finished` branch. The audience sees this URL throughout —
  slides, working /feedback, everything. Same URL works on their phones.
- **Mid-demo "switch"** is just shifting focus from terminal to browser —
  no `git checkout demo-finished` needed. The browser already shows the
  finished result because the live URL is on demo-finished.

## Pre-show checklist (10 min before going live)

- [ ] Plug in laptop charger (no battery surprises)
- [ ] Close Slack, mail, notifications (Do Not Disturb ON)
- [ ] Browser zoom set so audience can read code (cmd+= a few times)
- [ ] Terminal font size large (cmd+= a few times)
- [ ] Checkout `main` branch: `git checkout main`
- [ ] Run `npm run preshow` — one-shot preflight (branch, working tree,
      deps, slide-7 freshness, tests, **plus warm-up curl on the live URL**
      so the Render free-tier service isn't cold). Exits **READY TO
      PRESENT** or **NOT READY** with a fix list.
- [ ] Browser tab #1 (audience-facing): <https://presentation.vladimirbujanovic.com/slides/1>
- [ ] Browser tab #2 (optional, for verifying live agent edits visually):
      `http://localhost:4300/slides/1` — only if you start `npm run dev`
- [ ] Terminal 1: `claude` in the repo root (running on `main`)
- [ ] Terminal 2 (optional): `npm run dev` if you want a local preview
- [ ] Cheatsheet open on a separate device or paper
- [ ] `docs/presentation/04-prepared-prompts.md` open for copy-paste
- [ ] Take a deep breath. 30 minutes. You've practiced.

---

# PHASE 1 — Intro and concept (0:00 — 5:00)

## Slide 1 (Title) — 0:00 to 0:45

**Show:** Slide 1 in browser

**Say (English):**
> "Thanks for being here. Next 30 minutes — not what Claude Code is in
> marketing terms, but how it works in practice and what it means for your
> daily work."

> "My goal isn't to convince you. My goal is for you to leave with enough
> information to make your own call."

**Do:** Press → for slide 2

**NE zaboravi:** Ne čitaj slide. Pogledaj publiku.

---

## Slide 2 (What Claude Code is) — 0:45 to 2:15

**Show:** Slide 2

**Say:**
> "Claude Code is a local CLI agent. It reads your repo, edits your files,
> runs your commands. Lives in your terminal."

> "Important: nothing leaves your machine without your decision. You see
> everything. You control what gets committed."

**Do:** Press → for slide 3

---

## Slide 3 (Why prompts aren't enough) — 2:15 to 3:30

**Show:** Slide 3 — **THIS IS THE MOST IMPORTANT CONCEPTUAL SLIDE**

**Say:**
> "If you've used ChatGPT for code, you know the problem: you copy-paste,
> tweak, copy back. The agent doesn't know your project. It doesn't know
> your conventions. Each prompt restarts."

> "The fix is three things: a project context file we call CLAUDE.md, reusable
> workflows called skills, and parallel specialized work via subagents."

> "I'll show you all three in the next 15 minutes."

**Do:** Press → for slide 4

**Backup ako neko pita:** "CLAUDE.md is just a markdown file in the repo root.
Claude reads it before every interaction."

---

## Slide 4 (Architecture) — 3:30 to 5:00

**Show:** Slide 4 + open VS Code on the side with the repo

**Say:**
> "Today's demo app. Standard stack: Angular frontend, Express backend,
> Playwright for end-to-end. Tests via Vitest."

> "Notable: the slides you see right now are rendered by this same app.
> Same Angular components. Same CLAUDE.md. Same test setup. The thing the
> agent works on during the demo IS the slides app."

**Do:**
- Open `CLAUDE.md` in editor
- Scroll to "Workflow rules" section
- Read out 1-2 lines (e.g., "Plan first, code second")
- *"This is the file that drives every agent interaction with this repo."*

**Press → for slide 5** when done.

**NE zaboravi:** ovo je najduži deo pre live-a. Ne žuri, ali ni ne sedi.

---

# PHASE 2 — Demo task setup (5:00 — 9:00)

## Slide 5 (Demo task) — 5:00 to 7:00

**Show:** Slide 5

**Say:**
> "Today's task: an audience Q&A feature. Real shape. Form, validation, two
> backend endpoints, in-memory storage. Tests at every level: unit,
> integration, e2e."

> "Watch the agent build this end-to-end. Or rather — watch it START to build
> this. We won't have time to watch the whole thing."

**Do:**
- Click the "Try the demo feature" link on the slide
- Briefly show the working /feedback page (you're on `main` so it WON'T be
  there — that's the point: *"This is what we're going to build."*)
- Press ← back to slide 5

**Press → for slide 6**

---

## Slide 6 (Live flow) — 7:00 to 9:00

**Show:** Slide 6

**Say:**
> "These are the 6 steps of the workflow. Watch what happens when I trigger them."

> "I'll let you see the first 3 live on `main` — brainstorm, plan, execute.
> Step 3 finishes the code in 5–10 minutes, so we'll cut and switch to the
> finished branch. Steps 4, 5, and 6 — simplify, review, document — I'll
> then run live on top of the finished result."

**Do:** Switch to terminal with Claude Code

---

# PHASE 3 — LIVE DEMO (9:00 — 18:00)

## The live block — 9:00 to 18:00

**This is the part you've practiced 3+ times.** Use the prompts in
`04-prepared-prompts.md`. **Live block covers Prompts 1–4** (workflow
steps 1–3 + the cut). Prompts 5–7 happen in Phase 4.

### Phase A: Brainstorm — workflow step 1 (9:00 — 12:00)
- **Paste Prompt 1** (brainstorming trigger)
- **Say while it loads (~5s):** *"Brainstorming skill, step 1 of the
  workflow. It will ask me questions instead of guessing."*
- **Answer 4-6 questions.** Reference the prompt doc for sample answers.
- **Talk between answers** — *"This is the kind of question a senior would ask
  before starting work."*

### Phase B: Plan — workflow step 2 (12:00 — 14:00)
- **Paste Prompt 2** (move to writing-plans)
- **Say:** *"Step 2. It's writing a real plan document. Survives the
  conversation."*
- Wait for the plan file to appear

### Phase C: Execute via subagents — workflow step 3 (14:00 — 16:00)
- **Paste Prompt 3** (subagent dispatch)
- **Say:** *"Step 3 — execute. Each subagent is independent — backend,
  frontend, tests. They run in parallel because the work is multi-layer."*
- Wait until you see the task list dispatched

### Phase D: Cut (16:00 — 18:00)
- **Speak Prompt 4** *"This would now run for 5-10 minutes. To respect your
  time, here's what the same workflow produced — already deployed at the
  URL you've been seeing. Then we'll run steps 4, 5, and 6 live on top
  of it."*
- **Switch focus** from terminal to browser tab #1 (the live URL).
  No `git checkout` needed — the live URL is already serving the
  finished state from `demo-finished`.
- Click "Try the demo feature" on slide 5, or just navigate to
  `/feedback` on the live URL — submit a question to prove it works
  end-to-end.

---

# PHASE 4 — Result and review (18:00 — 25:00)

## Slide 7 (Results) — 18:00 to 19:00

**Browser already on the live URL** — navigate to slide 7.

**Say:**
> "Same workflow, finished and committed. These numbers come straight from the
> repo, regenerated by `npm run results:refresh` before the talk: 68 unit and
> integration tests passing, 95% backend coverage, 83% frontend, plus 4
> functional and 11 visual regression e2e tests."

> "Same commands your team already knows — `npm test`, `npm run e2e`."

**Then run them live in the terminal so the audience sees green.**

## Diff + tests (19:00 — 20:30)

**Do (in terminal):**
```bash
git diff main..demo-finished --stat
```

**Say:**
> "About 20 files. Backend, frontend, tests. No random refactoring. No files
> outside the scope of the task."

**Do:**
- Open `server/src/validators/feedback.ts` in VS Code (~30 seconds)
- *"Reviewable like any other code."*
- Run `npm test` in terminal — wait for green (~5s)

## Prompt 5 — `/simplify` — workflow step 4 (20:30 — 21:30)

- **Paste Prompt 5** (`/simplify` over the diff)
- **Say:** *"Step 4 of the workflow. Skill scans the new code for redundant
  helpers, dead state, premature abstractions. We run it after the code
  exists, not before."*
- Show whatever it flags. If it flags nothing, say so — that's also a
  signal.

## Prompt 6 — `code-reviewer` — workflow step 5 (21:30 — 22:45)

- **Paste Prompt 6** (code-reviewer subagent against plan + CLAUDE.md)
- **Say:** *"Step 5. Different Claude — didn't write this code. Reads the
  plan, the conventions, and the diff. Senior-engineer review, the kind
  you'd do before opening a PR."*
- Read 1–2 of its findings to the audience.

## Prompt 7 — Documentation update — workflow step 6 (22:45 — 23:45) — OPTIONAL

**This is the first thing to skip when running over.** If past 23:15,
go straight to Coverage / Slide 8.

- **Paste Prompt 7** (proposed doc patch)
- **Say:** *"Step 6. Closes the loop — docs written after the code, in the
  same commit, stay accurate. In production we'd apply this patch."*

## Coverage (23:45 — 25:00)

**Do:**
```bash
npm run coverage
open server/coverage/index.html
```

**Say:**
> "Coverage isn't a goal in itself. But here it tells you the agent didn't
> skip tests."

---

# PHASE 5 — Limits and conclusion (25:00 — 30:00)

## Slide 8 (What works) — 25:00 to 25:45

**Switch back to slides:** browser, → to slide 8

**Say:**
> "What you saw earlier — those are the patterns where agents shine.
> Scaffolding, predictable code, test wiring. Bounded problems."

**Press →**

## Slide 9 (Limits) — 25:45 to 27:45 — **CRITICAL FOR CREDIBILITY**

This slide gets the extra time freed up by cutting the old "Why agents"
slide. Use it. Two minutes here is more valuable than two minutes
anywhere else in the talk.

**Say:**
> "Where it can go wrong. Wrong assumptions made silently. Diffs bigger than
> the task warranted. Tests that pass but don't really verify."

> "*Brief personal example*: [insert one short story — agent added a dependency
> we didn't need, caught in review]."

> "The plan-first workflow you saw directly addresses this. If the agent
> writes a plan, you see what won't work before code is written."

> "*Second concrete: tests that pass but don't verify.* Agent wrote a test
> that asserted the route returned 200 — but didn't check the body. Looked
> green; verified nothing. Caught in review. The fix isn't 'no agents' —
> it's 'mandatory review, every time'."

**Press →**

## Slide 10 (Team model) — 27:45 to 28:45

**Say:**
> "How a team should use this. Agent makes the plan, human approves. Agent
> makes small diffs, human reviews each. Tests are mandatory. No autonomous
> merging."

> "Treat the agent as a fast junior. Treat yourself as the senior."

**Press →**

## Slide 11 (Conclusion) — 28:45 to 30:00

**Say:**
> "The takeaway: the value isn't agent autonomy. It's a faster, controlled
> cycle where the developer stays the owner."

> "If you'd try one thing tomorrow: write a CLAUDE.md for one of your repos.
> Half an hour. You'll see the difference in the next interaction."

> "Thank you. Questions?"

**Do:** Click the "Leave a question or comment" link to take the audience to
the live Q&A page.

---

# Time triage table

If you run over, cut in this order:

| If past... | Then skip... |
|------------|--------------|
| 6:30 entering Phase 2 | Slide 4 deep dive (just point at the file, don't read) |
| 17:30 still in Phase 3 | The dispatch wait — speak Prompt 4 immediately |
| 22:00 entering simplify | Skip Prompt 7 (docs update) outright |
| 23:00 still on review | Skip Prompt 7 outright; jump to coverage |
| 23:30 entering coverage | Skip coverage section, jump to Slide 8 |
| 28:00 still on limits | Combine Slide 10 + 11 in 60 seconds |

# Total recovery rule

If anything is going badly past 20:00, **immediately**:
1. Switch browser focus to the live URL tab (already open)
2. Navigate to /feedback to prove the feature works
3. Skip to Phase 4 (Result section)

The audience came for the workflow story. They will not notice you skipped
the dispatch detail if you're confident.

If the live URL itself is unreachable (Render down, network problem),
fall back to local: in a terminal, `git checkout demo-finished &&
npm run dev`, then open `http://localhost:4300`. Slower but works
offline.

---

# Personal reminders

- **Pause is fine.** Silence reads as confidence.
- **Don't apologize.** Skipping = "Let me move on", not "Sorry about that".
- **Don't read the slide.** Look at the audience.
- **Hands away from face.** Don't touch your nose / glasses.
- **One sip of water at slide 4.** And one at slide 9. Don't drink mid-sentence.
- **Last 30 seconds:** smile. Thank them. Pause for applause / silence.
