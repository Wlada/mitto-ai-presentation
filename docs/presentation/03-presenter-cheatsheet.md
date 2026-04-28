# Presenter Cheatsheet

> **Print this. Keep it next to your laptop.** A4 portrait, one phase per page
> ideally. Speaker notes in Serbian (for you), spoken lines in English.
>
> **Rule:** if anything goes wrong, you say *"Let me move on"* and skip to the
> next phase. Never apologize for skipping.

---

## Pre-show checklist (10 min before going live)

- [ ] Plug in laptop charger (no battery surprises)
- [ ] Close Slack, mail, notifications (Do Not Disturb ON)
- [ ] Browser zoom set so audience can read code (cmd+= a few times)
- [ ] Terminal font size large (cmd+= a few times)
- [ ] Checkout `main` branch: `git checkout main`
- [ ] Run `npm run results:refresh` — regenerates Slide 8 numbers from current coverage
- [ ] In Terminal 1: `npm run dev` — verify both servers start (web :4300, server :3000)
- [ ] In Terminal 2: keep ready for `claude` invocation
- [ ] Open browser to `http://localhost:4300/slides/1`
- [ ] Open this cheatsheet on a separate device or paper
- [ ] Open `docs/presentation/04-prepared-prompts.md` for copy-paste
- [ ] Take a deep breath. 30 minutes. You've practiced.

---

# PHASE 1 — Intro and concept (0:00 — 6:00)

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

## Slide 2 (Why agents) — 0:45 to 2:00

**Show:** Slide 2

**Say:**
> "AI coding agents shorten the cycle from idea to working code. Faster
> understanding of unfamiliar code. Faster scaffolding. Tests written along
> with the code, not after."

> "Important: this is not about replacing engineers. It's about a shorter
> cycle, with control. Where the developer stays the reviewer and the owner."

**Do:** Press → for slide 3

**Ako pređeš preko vremena:** preskoči ovaj slajd ubuduće — manje važan.

---

## Slide 3 (What Claude Code is) — 2:00 to 3:30

**Show:** Slide 3

**Say:**
> "Claude Code is a local CLI agent. It reads your repo, edits your files,
> runs your commands. Lives in your terminal."

> "Important: nothing leaves your machine without your decision. You see
> everything. You control what gets committed."

**Do:** Press → for slide 4

---

## Slide 4 (Why prompts aren't enough) — 3:30 to 5:00

**Show:** Slide 4 — **THIS IS THE MOST IMPORTANT CONCEPTUAL SLIDE**

**Say:**
> "If you've used ChatGPT for code, you know the problem: you copy-paste,
> tweak, copy back. The agent doesn't know your project. It doesn't know
> your conventions. Each prompt restarts."

> "The fix is three things: a project context file we call CLAUDE.md, reusable
> workflows called skills, and parallel specialized work via subagents."

> "I'll show you all three in the next 15 minutes."

**Do:** Press → for slide 5

**Backup ako neko pita:** "CLAUDE.md is just a markdown file in the repo root.
Claude reads it before every interaction."

---

## Slide 5 (Architecture) — 5:00 to 7:00

**Show:** Slide 5 + open VS Code on the side with the repo

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

**Press → for slide 6** when done.

**NE zaboravi:** ovo je najduži deo pre live-a. Ne žuri, ali ni ne sedi.

---

# PHASE 2 — Demo task setup (6:00 — 9:00)

## Slide 6 (Demo task) — 6:00 to 8:00

**Show:** Slide 6

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
- Press ← back to slide 6

**Press → for slide 7**

---

## Slide 7 (Live flow) — 8:00 to 9:30

**Show:** Slide 7

**Say:**
> "These are the 5 steps. Watch what happens when I trigger them."

> "I'll let you see the first 3 — brainstorm, plan, dispatch. Then I'll cut
> early, because steps 4 and 5 take longer than you have patience for. I ran
> the same workflow yesterday — I'll show you that result."

**Do:** Switch to terminal with Claude Code

---

# PHASE 3 — LIVE DEMO (9:30 — 18:30)

## The live block — 9:30 to 18:30

**This is the part you've practiced 3+ times.** Use the prompts in
`04-prepared-prompts.md`.

### Phase A: Brainstorm (9:30 — 12:30)
- **Paste Prompt 1** (brainstorming trigger)
- **Say while it loads (~5s):** *"Brainstorming skill. It will ask me
  questions instead of guessing."*
- **Answer 4-6 questions.** Reference the prompt doc for sample answers.
- **Talk between answers** — *"This is the kind of question a senior would ask
  before starting work."*

### Phase B: Plan (12:30 — 14:30)
- **Paste Prompt 3** (move to writing-plans)
- **Say:** *"It's writing a real plan document. Survives the conversation."*
- Wait for the plan file to appear

### Phase C: Dispatch (14:30 — 16:30)
- **Paste Prompt 4** (subagent dispatch)
- **Say:** *"Each subagent is independent — backend, frontend, tests. They run
  in parallel."*
- Wait until you see the task list dispatched

### Phase D: Cut and switch (16:30 — 18:30)
- **Speak Prompt 5** *"This would now run for 5-10 minutes. To respect your
  time, here's what I produced yesterday."*
- **Type:** `git checkout demo-finished`
- **Refresh browser** at /feedback

---

# PHASE 4 — Result and review (18:30 — 25:00)

## Slide 8 (Results) — 18:30 to 19:30

**Switch back to slides:** browser, → to slide 8

**Say:**
> "Same workflow, finished and committed. These numbers come straight from the
> repo: 72 tests passing, 95%+ backend coverage, 70%+ frontend, 4 e2e in 13s."

> "Same commands your team already knows — `npm test`, `npm run e2e`."

**Then run them live in the terminal so the audience sees green.**

## Diff and code (19:30 — 21:00)

**Do (in terminal):**
```bash
git diff main..demo-finished --stat
```

**Say:**
> "About 20 files. Backend, frontend, tests. No random refactoring. No files
> outside the scope of the task."

**Do:**
- Open `server/src/validators/feedback.ts` in VS Code
- Show 30 seconds of clean code
- *"This goes through PR review like any other code. It's not magic, it's
  reviewable."*

## Code-reviewer subagent (21:00 — 22:30) — OPTIONAL if time permits

- **Paste Prompt 6** (code-reviewer)
- **Say:** *"This is a different Claude. Independent review, like a senior
  colleague. Could be your pre-PR step."*

## Tests (22:30 — 24:00)

**Do (in terminal 1):**
```bash
npm test
```
Wait for green. Should be ~5 seconds.

**Do (in terminal 2):**
```bash
npm run e2e
```
Playwright opens browser, walks through Q&A flow.

**Say:**
> "All written by the agent through subagents. 61 unit and integration tests,
> 4 Playwright tests."

## Coverage (24:00 — 25:00)

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

## Slide 9 (What works) — 25:00 to 26:00

**Switch back to slides:** browser, → to slide 9

**Say:**
> "What you saw earlier — those are the patterns where agents shine.
> Scaffolding, predictable code, test wiring. Bounded problems."

**Press →**

## Slide 10 (Limits) — 26:00 to 27:30 — **CRITICAL FOR CREDIBILITY**

**Say:**
> "Where it can go wrong. Wrong assumptions made silently. Diffs bigger than
> the task warranted. Tests that pass but don't really verify."

> "*Brief personal example*: [insert one short story — agent added a dependency
> we didn't need, caught in review]."

> "The plan-first workflow you saw directly addresses this. If the agent
> writes a plan, you see what won't work before code is written."

**Press →**

## Slide 11 (Team model) — 27:30 to 28:30

**Say:**
> "How a team should use this. Agent makes the plan, human approves. Agent
> makes small diffs, human reviews each. Tests are mandatory. No autonomous
> merging."

> "Treat the agent as a fast junior. Treat yourself as the senior."

**Press →**

## Slide 12 (Conclusion) — 28:30 to 30:00

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
| 7:30 entering Phase 2 | Slide 5 deep dive (just point at the file, don't read) |
| 18:00 still in Phase 3 | The dispatch wait — paste Prompt 5 immediately |
| 22:00 entering tests | Skip code-reviewer subagent |
| 24:00 entering coverage | Skip coverage section, jump to Slide 9 |
| 28:00 still on limits | Combine Slide 11 + 12 in 60 seconds |

# Total recovery rule

If anything is going badly past 20:00, **immediately**:
1. `git checkout demo-finished`
2. Refresh browser to /feedback (works)
3. Skip to Phase 4 (Result section)

The audience came for the workflow story. They will not notice you skipped
the dispatch detail if you're confident.

---

# Personal reminders

- **Pause is fine.** Silence reads as confidence.
- **Don't apologize.** Skipping = "Let me move on", not "Sorry about that".
- **Don't read the slide.** Look at the audience.
- **Hands away from face.** Don't touch your nose / glasses.
- **One sip of water at slide 5.** And one at slide 10. Don't drink mid-sentence.
- **Last 30 seconds:** smile. Thank them. Pause for applause / silence.
