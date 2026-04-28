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

## Workflow at a glance

This repo's canonical workflow is a six-step cycle, defined in `CLAUDE.md`.
Every non-trivial change goes through:

1. **Brainstorm** — `/superpowers:brainstorming`
2. **Plan** — `/superpowers:writing-plans` (writes to `docs/plans/`)
3. **Execute** — `/superpowers:subagent-driven-development` (parallel,
   preferred for multi-layer work) **or** continue in the main agent
   (preferred for single-layer, tightly-coupled work)
4. **Simplify** — `/simplify` skill on the changed code
5. **Review** — `code-reviewer` subagent against the plan and conventions
6. **Document** — update `CLAUDE.md`, `README.md`, and `docs/`

The Audience Q&A feature on `demo-finished` was built end-to-end with this
exact workflow. The prompts below reproduce it.

**Live vs. pre-built split:**
- **Steps 1–3** (Prompts 1–3) run live on `main`.
- After Prompt 4 (the planned cut) you switch to `demo-finished`.
- **Steps 4–6** (Prompts 5–7) run live on `demo-finished` against the
  finished result.

---

## Live demo prompts (steps 1–3, executed live on `main`)

### Prompt 1 — Brainstorm (workflow step 1)

**When:** Slide 7, immediately after you say "let me actually run it now."

**Paste this:**

```text
/superpowers:brainstorming I want to add an Audience Q&A feature to this
presentation app. Users should be able to submit questions, comments, or
suggestions, and view them in a near real-time list. Help me design and
plan this end-to-end (frontend, backend, validation, tests).
```

**What you say while it loads (5–10 seconds):**
> *"This is the brainstorming skill — workflow step 1. Instead of guessing
> my requirements, it's going to ask me one question at a time. Watch what
> it picks up."*

The skill will ask 4–6 questions. **Have ready answers** so you don't stumble.
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

### Prompt 2 — Move to plan (workflow step 2)

**When:** Brainstorming feels done (3–5 questions answered).

**Paste this:**

```text
That's enough context. Please use /superpowers:writing-plans to write the
plan to docs/plans/, then we'll dispatch subagents to implement it.
```

**What you say while it writes:**
> *"Step 2 — it's writing a plan document, an actual file in the repo.
> This survives the conversation. If I close my terminal, the plan is
> still there. New sessions can pick it up. That's a deliberate part of
> the workflow."*

---

### Prompt 3 — Execute via subagents (workflow step 3)

**When:** The plan document is written and you can see it.

**Paste this:**

```text
Now use /superpowers:subagent-driven-development to dispatch parallel
subagents for this plan. Run all independent tasks in parallel.
```

**What you say while subagents start:**
> *"Step 3 — execute. This feature touches backend, two frontend
> components, and tests, so we go parallel. Each subagent is an
> independent Claude instance with one focused task. The main agent
> would be the right choice for a single-layer change — but here we
> want the fan-out."*

---

### Prompt 4 — STOP and switch to `demo-finished`

**When:** All subagents have started and the task list is visible. **Don't
wait for them to complete** — that takes 5–10 minutes you don't have.

**Speak this** (don't type — say it to the audience):

> *"Okay — this would now run for about 5 to 10 minutes while the subagents
> finish their work. To respect your time, I ran this exact workflow
> yesterday. Let me show you the result, and then we'll run steps 4, 5,
> and 6 of the workflow live on top of it."*

**Then in a new terminal tab, run:**

```bash
git checkout demo-finished
```

If Claude Code asks about the running subagents, say in chat:

```text
Stop the running subagents — I'll show the pre-built result instead.
```

---

## Post-result prompts (steps 4–6, executed live on `demo-finished`)

These run against the finished feature. The audience has already seen the
diff and a green test run, so the workflow story is intact even if any of
these stalls.

### Prompt 5 — Simplify pass (workflow step 4)

**When:** After Slide 8 (Results) and the live `npm test` / `git diff`,
~minute 21.

**Paste this:**

```text
/simplify Look at the diff between main and demo-finished. Focus on the
new feedback feature: server/src/routes/, server/src/services/,
server/src/validators/, and apps/web/src/app/feedback/. Flag duplicated
code, dead helpers, premature abstractions, redundant state, and one-shot
wrappers. Apply small fixes inline; flag judgement calls.
```

**What you say while it scans:**
> *"Step 4 — simplify. After the code exists, this skill looks for things
> the agent over-built. We run it after, not before, because premature
> simplification deletes things you actually need."*

---

### Prompt 6 — Code review (workflow step 5)

**When:** Right after Prompt 5 completes, ~minute 22.

**Paste this:**

```text
Use the code-reviewer subagent to review the changes between main and
demo-finished against the plan in docs/plans/ and the conventions in
CLAUDE.md. Focus on: scope discipline, test coverage, validation
correctness, and anything a senior reviewer would flag.
```

**What you say:**
> *"Step 5 — review. This is a different Claude. It didn't write this code.
> It reads the plan, the conventions, and the diff, then reviews like a
> senior engineer. In a real workflow, this is the step you run before
> opening the PR."*

---

### Prompt 7 — Documentation update (workflow step 6, optional)

**When:** Only if you're at minute 24 or earlier with everything else done.
**This is the first thing to cut when running over.**

**Paste this:**

```text
Look at the diff between main and demo-finished. Identify anything that
would change CLAUDE.md, README.md, or docs/ — new commands, new scripts,
new conventions, or behavior the audience or future contributors need to
know. Show me a proposed doc patch. Don't apply it yet.
```

**What you say:**
> *"Step 6 — document. Docs written before the code lie. Docs written
> after the code, in the same commit, stay accurate. In production we'd
> apply this patch; today we just show that the workflow loops back to
> docs."*

---

## Emergency prompts (if things go wrong)

### If brainstorming gets stuck or repeats itself:

```text
Skip the remaining questions. Use what you have to write the plan now.
```

### If a subagent fails:

```text
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

Aligned to the 6-step workflow. Prompts 1–3 run live on `main`; Prompt 4
is the cut; Prompts 5–7 run live on `demo-finished`.

| Prompt | Workflow step | Slide / Moment | Approx. Time |
|--------|---------------|----------------|--------------|
| 1 — Brainstorm | 1 — Brainstorm | After slide 7, ~10:30 | 30s typing + 2–3 min Q&A |
| 2 — Move to plan | 2 — Plan | Brainstorm complete, ~13:00 | 1–2 min for plan to write |
| 3 — Subagent dispatch | 3 — Execute | Plan visible, ~14:30 | 1–2 min for dispatch fan-out |
| 4 — STOP and switch | (cut) | Task list shown, ~16:30 | <30s |
| 5 — `/simplify` | 4 — Simplify | After diff + tests, ~21:00 | 1 min |
| 6 — `code-reviewer` | 5 — Review | Right after Prompt 5, ~22:00 | 1–2 min |
| 7 — Doc update | 6 — Document | Bonus, ~24:00 | 30–60s — **cut first** |
