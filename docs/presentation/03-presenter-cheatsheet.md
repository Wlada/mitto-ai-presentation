# Presenter Cheatsheet

> **Print this. Keep it next to your laptop.** A4 portrait, one phase per page
> ideally. Speaker notes and spoken lines both in English.
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
      deps, slide-6 freshness, tests, **plus warm-up curl on the live URL**
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

**Say:**
> "Hi everyone, thanks for being here. My name is Vladimir, and over the
> next 30 minutes I want to show you how I've been getting the best results
> out of Claude Code, and what that means for our day-to-day work."

> "My goal isn't to convince you. My goal is for you to leave with enough
> information to make your own call."

**Do:** Press → for slide 2

**Reminder:** Don't read the slide. Look at the audience.

---

## Slide 2 (Claude Code CLI) — 0:45 to 2:15

**Show:** Slide 2

**Say:**
> "Claude Code CLI is a local CLI agent that lives in your terminal. It can
> read your repo, edit your files, run your commands, and follow project-
> specific rules."

> "Important: nothing leaves your machine without your decision. We decide
> what runs and what gets executed."

**Do:** Press → for slide 3

---

## Slide 3 (The problem with Chat agent) — 2:15 to 3:30

**Show:** Slide 3 — **THIS IS THE MOST IMPORTANT CONCEPTUAL SLIDE**

**Say:**
> "If we use a chat tool — like ChatGPT — for coding, we end up in a
> copy/paste cycle: code in, edits, code back out. The chat agent doesn't
> know the project context. It has no specific workflow, so it can skip
> things or do them differently. Without rules it adds dependencies we
> don't want."

> "Three things fix this. First, CLAUDE.md. It's a file in the repo that
> tells the agent the project rules — what stack, what tests, what not to
> do. The agent reads it every time."

> "Second, Skills. A skill is a saved workflow you call with a slash
> command. The agent follows the same steps every time, instead of
> inventing them."

> "Third, Subagents. A subagent is a separate Claude with one job and
> its own memory. We use them for parallel work, and for a fresh code
> review from a different agent."

> "I'll show you all three in the next 15 minutes."

**Do:** Press → for slide 4

**Backup if asked:** "CLAUDE.md is just a markdown file in the repo root.
Claude reads it before every interaction."

---

## Slide 4 (Today's demo app) — 3:30 to 7:00

**Show:** Slide 4 + open VS Code on the side with the repo

**Say:**
> "In today's demo app we'll add a Q&A feature. We use a standard stack —
> Angular, Express, Playwright. The interesting part is the CLAUDE.md
> file at the top of the repo."

**Point to the closing line on the slide ("The slides you're seeing now
were built with this same setup.") and expand on it:**
> "The slides you see right now are rendered by this same app. Same Angular
> components, same CLAUDE.md, same test setup. The thing the agent works on
> during the demo IS the slides app."

**Do:**
- Open `CLAUDE.md` in editor
- Scroll to "Workflow rules" section
- Read out 1-2 lines (e.g., "Plan first, code second")
- *"This is the file that drives every agent interaction with this repo."*

**Press → for slide 5** when done.

**Reminder:** longest section before the live demo. Don't rush, but don't sit on it either.

---

# PHASE 2 — Demo task setup (7:00 — 9:00)

## Slide 5 (What the agent will do) — 7:00 to 9:00

**Show:** Slide 5

**Say:**
> "We'll see how the agent runs an end-to-end feature. We'll walk through
> brainstorming, planning, and subagent execution — but we won't wait for
> the whole feature, because that takes 15-20 minutes. The agent will also
> write unit + integration tests as well as Playwright e2e tests."

> "I'll let you see steps 1-3 live on `main` — brainstorm, plan, dispatch.
> Once the subagents are dispatched, we cut. The same workflow already
> finished on `demo-finished`, and the live URL is showing the result —
> so we move to it and you see what came out."

**Do:** Switch to terminal with Claude Code

---

# PHASE 3 — LIVE DEMO (9:00 — 18:00)

## The live block — 9:00 to 18:00

**This is the part you've practiced 3+ times.** Use the prompts in
`04-prepared-prompts.md`. **Live block covers Prompts 1–4** — workflow
steps 1–3 plus the cut. Workflow steps 4–6 (Simplify / Review / Document)
were already executed on `demo-finished`; Slide 6 narrates them. Prompts
5–7 in the prompts doc are optional reference, not part of the standard
click-through flow.

### Phase A: Brainstorm — workflow step 1 (9:00 — 12:00)
- **Paste Prompt 1** (brainstorming trigger) — the prompt is short on purpose
- **Say while it loads (~5–10s):** *"Brainstorming skill, step 1 of the
  workflow. Notice how short the prompt is — I didn't tell it the stack
  or the constraints. It reads those from CLAUDE.md. The questions
  you'll see next are the things CLAUDE.md doesn't cover."*
- **Answer 2–3 questions.** Use the answer cheat sheet in `04-prepared-prompts.md` — every likely question has a one-line scripted reply.
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
  URL you've been seeing. Then we'll run steps 4 and 5 live on top
  of it."*
- **Switch focus** from terminal to browser tab #1 (the live URL).
  No `git checkout` needed — the live URL is already serving the
  finished state from `demo-finished`.
- Click "Try the demo feature" on slide 6, or just navigate to
  `/feedback` on the live URL — submit a question to prove it works
  end-to-end.

---

# PHASE 4 — Result (18:00 — 21:00)

## Slide 6 (What we produced) — 18:00 to 21:00

**Browser already on the live URL** — navigate to slide 6.

**Say:**
> "Here's what came out of the workflow we just saw — a working feature,
> with tests, in this repo. Let me show it."

**Click the "Try the demo feature" button.** Walk through the `/feedback`
page for about 30 seconds — type a question, submit it, see it appear in
the list, change the filter chip. Then click "Back to slide 6".

**Then say:**
> "68 unit and integration tests. 89% backend coverage, 84% frontend.
> 16 Playwright tests covering the slides and the Q&A page."

> "And the agent didn't just write the code. It also cleaned it up,
> reviewed its own work, and updated the docs. Those are three separate
> steps in the workflow — Simplify, Review, Document — and they're already
> written into `CLAUDE.md`, so they run on every non-trivial task without
> us asking."

> "Coverage isn't the goal, but it tells you the agent didn't skip tests."

**Press → for slide 7.**

**Optional credibility moment (only if you have spare time):** before
pressing →, switch to terminal and run `git diff main..demo-finished
--stat`. Say *"About 20 files. Backend, frontend, tests. No random
refactoring."* Then back to browser. **Skip this if you are even slightly
behind schedule** — the slide already carries the message.

---

# PHASE 5 — Limits and conclusion (21:00 — 30:00)

## Slide 7 (What agents do well) — 21:00 to 22:30

**Switch back to slides:** browser, → to slide 7

**Say:**
> "What you saw earlier — those are the patterns where agents shine.
> Scaffolding, predictable code, test wiring. Bounded problems."

**Press →**

## Slide 8 (Limits) — 22:30 to 27:30 — **CRITICAL FOR CREDIBILITY**

This is the longest slide of the talk. Five minutes here is more valuable
than five minutes anywhere else. Use it. Walk through each bullet, give
one concrete example for the strongest two, and link each back to the
workflow you just showed.

**Say:**
> "Where it can go wrong. The agent can make a wrong guess and not tell
> you. It can change more than you asked for. It can write tests that
> pass but don't really test anything. It can sound sure even when it
> is wrong. And small cleanups can break other things."

> "*Brief personal example*: [one short story — for example: the agent
> added a library we didn't need; I caught it in the review.]"

> "This is why we plan first. The plan shows the wrong choice before
> any code is written."

> "*One more example: tests that pass but don't really test.* The agent
> wrote a test that checked the route returned 200, but did not check the
> body. It looked green and verified nothing. I caught it in the review.
> The fix is not 'no agents' — it is 'always review every change'."

**Press →**

## Slide 9 (Conclusion) — 27:30 to 30:00

**Say:**
> "The takeaway: it's a faster, controlled cycle where the developer stays the owner."

> "Treat the agent as a fast junior. Treat yourself as the senior."

> "Licenses for Claude Code or Codex are coming soon, so you'll all get
> to try this. Until then I'm here for questions, or come find me after."

> "Thank you. Questions?"

**Do:** Click the "Leave a question or comment" link to take the audience to
the live Q&A page.

---

# Time triage table

If you run over, cut in this order:

| If past... | Then skip... |
|------------|--------------|
| 6:30 still on slide 4 | Slide 4 deep dive (just point at the file, don't read) |
| 17:30 still in Phase 3 | The dispatch wait — speak Prompt 4 immediately |
| 19:30 still on slide 6 | The optional `git diff` terminal moment — let the slide carry it |
| 21:30 still on slide 6 | Cut the demo button click — just say *"the live URL has it, scan the QR later"* and press → |
| 28:30 still on limits | Trim Slide 9 (Conclusion) to 45 seconds — keep the takeaway and the "fast junior / senior" closer |

# Total recovery rule

If anything is going badly past 17:00, **immediately**:
1. Switch browser focus to the live URL tab (already open)
2. Navigate to /feedback to prove the feature works
3. Skip to Phase 4 (slide 6) and continue from there

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
- **One sip of water at slide 4.** And one at slide 8. Don't drink mid-sentence.
- **Last 30 seconds:** smile. Thank them. Pause for applause / silence.
