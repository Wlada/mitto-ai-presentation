# Prepared Prompts

> Copy-paste these into Claude Code at the corresponding moment in the live demo.
> All prompts are in English (so the audience reads what you type).
>
> **Tip:** keep this file open in a side window during the demo. Use a
> single-keystroke clipboard manager (Raycast, Alfred snippets, etc.) to paste
> instantly without searching this document.

---

## Setup before the demo

Before starting, in a terminal at the repo root:

```bash
# 1. Make sure you're on `main` (not `demo-finished`)
git checkout main

# 2. Start the dev server in a SEPARATE terminal window
npm run dev

# 3. Open the slides in the browser
open http://localhost:4300/slides/1

# 4. Open Claude Code in your project
claude
```

Verify Claude Code loads `CLAUDE.md` automatically (it should mention the
project context in its first response).

---

## Prompt 1 — Feature request via brainstorming skill

**When:** Slide 7, immediately after you say "let me actually run it now."

**Paste this:**

```
/superpowers:brainstorming I want to add an Audience Q&A feature to this
presentation app. Users should be able to submit questions, comments, or
suggestions, and view them in a near real-time list. Help me design and
plan this end-to-end (frontend, backend, validation, tests).
```

**What you say while it loads (5-10 seconds):**
> *"This is the brainstorming skill. Instead of guessing my requirements,
> it's going to ask me questions. Watch what it picks up."*

---

## Prompt 2 — Brainstorming answers (you respond to its questions)

The skill will ask 4-6 questions. **Have ready answers** so you don't stumble.
Sample answers (the actual questions may differ — adapt):

**If asked about feedback types:**
> "Three types: question, comment, suggestion. Type is required, defaults to question."

**If asked about authentication:**
> "No auth. Optional name field — if empty, display as 'Anonymous'."

**If asked about real-time updates:**
> "Polling every 3 seconds is fine. No websockets — the audience is small and we want to keep it simple."

**If asked about validation rules:**
> "Message required, max 500 characters. Name optional, max 50 characters. Reject empty-after-trim messages."

**If asked about persistence:**
> "In-memory only. The server restarts, the feedback resets. That's intentional for the demo."

**If asked about UI framework:**
> "Angular Material — match the existing app. One page with form on the left, list on the right."

**If asked about routes:**
> "/feedback for the combined view. /feedback/submit and /feedback/list as standalone routes for flexibility."

**If asked about anything else:**
> "Use the simplest implementation that meets the requirement. Defer additions."

---

## Prompt 3 — Move to plan writing

**When:** Brainstorming feels done (3-5 questions answered).

**Paste this:**

```
That's enough context. Please use /superpowers:writing-plans to write the
plan to docs/plans/, then we'll dispatch subagents to implement it.
```

**What you say while it writes:**
> *"It's writing a plan document — actual file in the repo. This survives the
> conversation. If I close my terminal, the plan is still there. That's a
> deliberate part of the workflow."*

---

## Prompt 4 — Dispatch subagents

**When:** The plan document is written and you can see it.

**Paste this:**

```
Now use /superpowers:subagent-driven-development to dispatch parallel
subagents for this plan. Run all independent tasks in parallel.
```

**What you say while subagents start:**
> *"Each subagent is an independent Claude instance with one focused task —
> backend, frontend form, frontend list, integration tests, e2e. They run in
> parallel. I won't wait for them to finish — I just want you to see the
> dispatch pattern."*

---

## Prompt 5 — Stop and switch (the planned cut)

**When:** All subagents have started and the task list is visible. **Don't
wait for them to complete** — that takes 5-10 minutes you don't have.

**Speak this** (don't type — say it to the audience):

> *"Okay — this would now run for about 5 to 10 minutes while the subagents
> finish their work. To respect your time, I ran this exact workflow
> yesterday. Let me show you the result."*

**Then in a new terminal tab, run:**

```bash
git checkout demo-finished
```

If Claude Code asks about the running subagents, say in chat:

```
Stop the running subagents — I'll show the pre-built result instead.
```

---

## Prompt 6 — Code reviewer subagent (post-result)

**When:** After Slide 8 (Results), once you have shown the diff and run tests, ~minute 22.

**Paste this:**

```
Use the code-reviewer subagent to review the changes between main and
demo-finished. Focus on: scope discipline, test coverage, and anything
a senior reviewer would flag.
```

**What you say:**
> *"This is a different Claude — it didn't write this code. It reviews like a
> senior engineer. In a real workflow, this is a step you'd run before opening
> a PR."*

**Note:** This is optional. **Skip if past 23 minutes.**

---

## Prompt 7 — `/simplify` bonus (only if time permits)

**When:** Only if you're at minute 24 or earlier with everything else done.

**Setup before the demo:** Have a deliberately cluttered version of one file
(e.g., `feedbackService.ts` with redundant variables, unnecessary helpers).

**Paste this:**

```
/simplify Look at server/src/services/feedback.service.ts and remove
unnecessary complexity. Keep behavior identical. Show the diff.
```

**What you say:**
> *"30 second bonus — `/simplify` is one of the skills you can install. It
> doesn't change behavior, just removes noise. Useful as a 'cleanup' step
> after generation."*

---

## Emergency prompts (if things go wrong)

### If brainstorming gets stuck or repeats itself:

```
Skip the remaining questions. Use what you have to write the plan now.
```

### If a subagent fails:

```
Don't worry about that subagent — proceed with the others. We'll see the
result either way.
```

### If you need to reset and restart:

In Claude Code, type `/clear` to start fresh, then re-run from Prompt 1.

### If the dev server crashes mid-demo:

In a fresh terminal: `npm run dev`. Wait for both servers to come up. Refresh
the browser.

---

## Prompt timing summary

| Prompt | Slide / Moment | Approx. Time |
|--------|----------------|--------------|
| 1 — Brainstorm trigger | After slide 7, ~10:30 | 30s typing + 1m for skill to engage |
| 2 — Answers | During brainstorm | 2-3 min total of Q&A |
| 3 — To plan | When brainstorm complete | 1-2 min for plan to write |
| 4 — Dispatch | When plan visible | 1-2 min for subagent dispatch |
| 5 — Stop and switch | When task list shows | <30s |
| 6 — Code reviewer | Post-result, ~22min | 1 min |
| 7 — Simplify (optional) | Bonus, ~24min | 30s |
