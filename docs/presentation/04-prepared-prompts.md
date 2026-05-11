# Prepared Prompts

> Copy-paste these into Claude Code at the corresponding moment in the live demo.
> All prompts are in English (so the audience reads what you type).
>
> **Tip:** keep this file open in a side window during the demo. Use a
> single-keystroke clipboard manager (Raycast, Alfred snippets, etc.) to paste
> instantly without searching this document.
>
> ## Standard flow vs. reference prompts
>
> **Standard click-through flow uses Prompts 1–4 only** — brainstorm, plan,
> dispatch, cut. After the cut, you narrate Slide 6 (which already says the
> agent ran Simplify / Review / Document on `demo-finished`) and move on.
>
> **Prompts 5–7 are reference documentation** of what the workflow actually
> did on `demo-finished`. They are useful if you have spare time and want
> to demonstrate `/simplify` and `code-reviewer` against the real diff, but
> they are **not part of the standard flow**. Skip them on the day.

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

**Live vs. deployed split:**
- **Steps 1–3** (Prompts 1–3) run live in your terminal on local `main`.
- The **deployed live URL** (`presentation.vladimirbujanovic.com`) serves
  `demo-finished` — the audience sees the finished result there throughout
  the talk. Slide 6 CTA already works because the live URL has the Q&A
  feature.
- After Prompt 4 (the planned cut), you don't `git checkout` anything —
  the live URL is already showing the finished state. You just shift
  focus from terminal back to the browser tab.
- **Steps 4–6** (Simplify, Review, Document) ran on `demo-finished` when
  the feature was built. Slide 6 narrates that they happened. **You do
  not run Prompts 5–7 in the standard flow.** They are kept below as
  reference / optional bonus material only.

---

## Live demo prompts (steps 1–3, executed live on `main`)

### Prompt 1 — Brainstorm (workflow step 1)

**When:** Slide 5, immediately after you say "let me actually run it now."

**Paste this:**

```text
/superpowers:brainstorming Add an Audience Q&A page at /feedback.

People in the room post a question, comment, or suggestion — each with
an optional name, a type, and a message. New entries show up on the page
automatically.
```

**What you say while it loads (5–10 seconds):**
> *"This is the brainstorming skill — workflow step 1. Notice how short
> the prompt is. I didn't tell it the stack, the storage rules, or the
> constraints — it reads all of that from CLAUDE.md. The questions you'll
> see next are the things CLAUDE.md doesn't cover."*

The skill should ask **2–3 questions** out of the list below. Answer with
the matching line; each answer is one short sentence so the dialogue
moves quickly. (Storage, database, auth, and websockets are not in this
list — CLAUDE.md forbids them, so the agent shouldn't ask.)

**Answer cheat sheet — say only the right-hand column:**

| If the agent asks about... | You say |
|---------------------------|---------|
| Update frequency / polling interval | *"Every 3 seconds is fine."* |
| Filtering the list | *"Yes — filter chips by type. All / Question / Comment / Suggestion. Default All."* |
| Empty state | *"Show a friendly empty-state message until the first entry. Something like 'No feedback yet — be the first to ask!'"* |
| Moderation / hiding posts | *"No moderation. Trust the room."* |
| Pre-seeding data | *"Start empty — the empty state should be visible on first load."* |
| Submit behavior / optimistic insert | *"Wait for the server response. Show a snackbar on success, then reset the form."* |
| Poll failure handling | *"Keep the last list visible. Show a small inline 'Could not load feedback' line. No retry, no toast."* |
| Anything not covered above | *"Use the simplest implementation that meets the requirement. Defer extras."* |

If the skill keeps asking after 3 questions, stop it:
> *"That's enough — let's move to the plan."*

---

### Prompt 2 — Move to plan (workflow step 2)

**When:** Brainstorming is done (usually 0–2 questions answered, then it stops itself).

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

### Prompt 4 — STOP and shift to the live URL

**When:** All subagents have started and the task list is visible. **Don't
wait for them to complete** — that takes 5–10 minutes you don't have.

**Speak this** (don't type — say it to the audience):

> *"Okay — this would now run for about 5 to 10 minutes while the subagents
> finish their work. To respect your time, the same workflow ran yesterday
> and the result is already deployed at the URL you've been on this whole
> time. Let me show you, and then we'll run steps 4, 5, and 6 of the
> workflow live on top of it."*

**Shift focus** from terminal to the browser tab on the live URL
(<https://presentation.vladimirbujanovic.com>). The browser already shows
the finished state — no `git checkout` needed. Click "Try the demo
feature" on slide 6, or navigate to `/feedback`, and submit a question to
prove it works.

If Claude Code asks about the running subagents, say in chat:

```text
Stop the running subagents — the live URL already shows the finished result.
```

---

## Reference / optional prompts (steps 4–6 — NOT used in standard flow)

> **Reminder:** Slide 6 already tells the audience that Simplify, Review,
> and Document ran on `demo-finished`. The standard click-through flow
> does **not** invoke these prompts live. They are kept here so you can
> demonstrate them on demand (extra time, hands-on workshop, recorded
> follow-up), and so that the prompts that actually built the deployed
> feature are documented.
>
> If you decide to run them anyway: `git checkout demo-finished` locally
> first; the live URL on the projector is unaffected.

### Prompt 5 — Simplify pass (workflow step 4)

**When:** After Slide 6 (Results) and the live `npm test` / `git diff`,
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

Standard flow uses Prompts 1–4 only. Prompts 5–7 are reference / optional.

| Prompt | Workflow step | Slide / Moment | Approx. Time |
|--------|---------------|----------------|--------------|
| 1 — Brainstorm | 1 — Brainstorm | After slide 5, ~9:30 | 10s typing + 60–120s Q&A (2–3 questions) |
| 2 — Move to plan | 2 — Plan | Brainstorm complete, ~12:00 | 1–2 min for plan to write |
| 3 — Subagent dispatch | 3 — Execute | Plan visible, ~14:00 | 1–2 min for dispatch fan-out |
| 4 — STOP and switch | (cut) | Task list shown, ~16:00 | <30s |
| 5 — `/simplify` | 4 — Simplify | **Not run live** — reference only | — |
| 6 — `code-reviewer` | 5 — Review | **Not run live** — reference only | — |
| 7 — Doc update | 6 — Document | **Not run live** — reference only | — |
