# Prompts (clean, for live demo)

> Audience-safe view: just the prompts to copy-paste, in order.
> Speaker notes and timing live in `04-prepared-prompts.md`.
>
> **Standard flow uses Prompts 1–4 only.** Prompts 5–7 (Simplify, Review,
> Doc update) are reference documentation of what ran on `demo-finished`;
> Slide 6 narrates that they happened. Do not run them live unless you
> explicitly have spare time and want to demonstrate.

---

## 1 — Brainstorm

```text
/superpowers:brainstorming Add an Audience Q&A page at /feedback.

People in the room post a question, comment, or suggestion — each with
an optional name, a type, and a message. New entries show up on the page
automatically.
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

## 5 — Simplify (reference / optional — not run live)

```text
/simplify Look at the diff between main and demo-finished. Focus on the
new feedback feature: server/src/routes/, server/src/services/,
server/src/validators/, and apps/web/src/app/feedback/. Flag duplicated
code, dead helpers, premature abstractions, redundant state, and one-shot
wrappers. Apply small fixes inline; flag judgement calls.
```

---

## 6 — Code review (reference / optional — not run live)

```text
/superpowers:requesting-code-review Review the diff between main and
demo-finished against the plan in docs/plans/ and the conventions in
CLAUDE.md. Focus on: scope discipline, test coverage, validation
correctness, and anything a senior reviewer would flag.
```

---

## 7 — Documentation update (reference / optional — not run live)

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
