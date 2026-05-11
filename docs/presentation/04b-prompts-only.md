# Prompts (clean, for live demo)

> Audience-safe view: just the prompts to copy-paste, in order.
> Speaker notes and timing live in `04-prepared-prompts.md`.

---

## 1 — Brainstorm

```text
/superpowers:brainstorming Add an Audience Q&A page at /feedback so anyone
in the room can post a question, comment, or suggestion and see a live list.
UI is locked — match this layout:

- Title "Audience Q&A" + subtitle "Send a question, comment, or suggestion.
  New entries appear in the list automatically."
- "Back to slide 6" button, top-left
- LEFT panel "Share your feedback":
  - Name (optional, max 50, char counter)
  - Type — Material mat-select dropdown, default "question",
    options: question / comment / suggestion
  - Message (required, max 500, char counter)
  - Submit button with send icon, disabled until valid
- RIGHT panel "Recent feedback":
  - Filter chip group: All / Question / Comment / Suggestion (default All)
  - Empty state "No feedback yet — be the first to ask!"
  - Each entry shows: name (or "Anonymous" if blank), type badge,
    relative time (e.g. "3 min ago"), message body

Technical decisions — do not ask about these, just apply:
- Backend: POST /api/feedback (returns 201 + entry), GET /api/feedback
  with optional ?type= query param. Server-side filter, NOT client-side.
- In-memory storage, newest-first sort by createdAt. No seed data —
  start empty so the locked empty state is reachable.
- Validator: name optional max 50 (trim), type required (one of three),
  message required (trim, 1–500). Standard {ok,value}|{ok,errors} shape.
- Frontend: polling interval = 3000ms with switchMap so old responses
  can't overwrite newer ones. Filter chip click triggers an immediate
  refresh, not just on next tick.
- Submit: wait for POST 201 (no optimistic insert). On success, show a
  Material snackbar "Thanks for your feedback!" and reset the form.
- On poll failure: keep the last list visible, show a small inline
  "Could not load feedback." line. No toast, no retry, no offline mode.
- Message body is rendered as plain text via Angular interpolation
  (default escaping). No HTML, no link auto-detection.
- No animation library. New entries just appear on the next poll.
- No moderation, no presenter mode, no admin gate.
```

---

## 2 — Move to plan

```text
That's enough context. Please use /superpowers:writing-plans to write the
plan to docs/plans/, then we'll dispatch subagents to implement it.
```

---

## 3 — Execute via subagents

```text
Now use /superpowers:subagent-driven-development to dispatch parallel
subagents for this plan. Run all independent tasks in parallel.
```

---

## 4 — STOP (spoken, not typed)

> Switch focus from terminal to the live URL.
> If Claude Code asks about running subagents:

```text
Stop the running subagents — the live URL already shows the finished result.
```

---

## 5 — Simplify

```text
/simplify Look at the diff between main and demo-finished. Focus on the
new feedback feature: server/src/routes/, server/src/services/,
server/src/validators/, and apps/web/src/app/feedback/. Flag duplicated
code, dead helpers, premature abstractions, redundant state, and one-shot
wrappers. Apply small fixes inline; flag judgement calls.
```

---

## 6 — Code review

```text
/superpowers:requesting-code-review Review the diff between main and
demo-finished against the plan in docs/plans/ and the conventions in
CLAUDE.md. Focus on: scope discipline, test coverage, validation
correctness, and anything a senior reviewer would flag.
```

---

## 7 — Documentation update (optional, cut first)

```text
Look at the diff between main and demo-finished. Identify anything that
would change CLAUDE.md, README.md, or docs/ — new commands, new scripts,
new conventions, or behavior the audience or future contributors need to
know. Show me a proposed doc patch. Don't apply it yet.
```

---

## Emergency

**Brainstorming stuck:**

```text
Skip the remaining questions. Use what you have to write the plan now.
```

**Subagent fails:**

```text
Don't worry about that subagent — proceed with the others. We'll see the
result either way.
```

**Reset:** `/clear` in Claude Code, then restart from prompt 1.
**Dev server crashed:** `npm run dev` in fresh terminal, refresh browser.
