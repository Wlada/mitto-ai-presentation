# CLAUDE.md template — how to write one for any repo

> Companion to this repo's `CLAUDE.md`. Read that file alongside this one;
> the headings below mirror its structure section by section. The goal here
> is to teach you how to *adapt the same pattern* to a different codebase.

---

## What CLAUDE.md is (and is not)

`CLAUDE.md` (also recognized by Claude Code under the alias `AGENTS.md`) is
the **standing context** the agent reads before every interaction with the
repo. Think of it as a permanent prompt prefix that does not consume your
conversation context window.

It **is**:

- The agent's working agreement with this codebase
- A short, opinionated set of rules and constraints
- The place to encode lessons learned from past bad agent runs

It is **not**:

- A project description for humans (that's `README.md`'s job)
- A tutorial, an architecture deep-dive, or a stack rationale
- A dumping ground for everything you'd put on a wiki

If a section reads like marketing copy or onboarding material, it belongs
in `README.md` or `docs/`, not `CLAUDE.md`.

---

## Why have one

Without project-specific rules, the agent guesses. It guesses your test
runner, your file-naming convention, whether you want a database, whether
default exports are okay. **Most failed agent runs are wrong assumptions
made silently.**

Two mechanisms surface those assumptions:

- **`CLAUDE.md`** prevents the wrong guess upfront — the rule is already
  in context.
- **Brainstorming** (`/superpowers:brainstorming`) forces remaining
  assumptions into the open through Q&A *before* code is written.

Brainstorming is a per-task safety net. `CLAUDE.md` is the standing one.
A repo with neither produces confident agent diffs that violate
unwritten conventions; a repo with only brainstorming asks the same
questions every session.

---

## What belongs / what doesn't

### Belongs in `CLAUDE.md`

- **Project-specific rules** — conventions a new contributor would need a
  human to explain (lint preset, in-memory storage, no auth, etc.)
- **Workflow expectations** — the steps every non-trivial task goes through
- **Code style per layer** — short bullets the agent will treat as ground truth
- **What NOT to do** — guardrails that prevent past mistakes from recurring
- **Definition of done** — the checklist the agent self-evaluates against
- **Demo / context-specific behaviors** — instructions that depend on usage
  ("this is a demo, optimize for clarity", "code is read on a projector")

### Does NOT belong

- **Project description, stack table, install commands** — those live in
  `README.md`. Agents do not need a five-paragraph intro.
- **Generated artifacts** (test counts, coverage numbers, file inventories)
  — derive these from a script (`npm run results:refresh`) or `git`/`grep`.
- **Anything that drifts** — every line is a maintenance liability. If a
  fact rots over time, prefer a script that recomputes it.

---

## Maintenance discipline (the most important rule)

**An outdated `CLAUDE.md` is worse than none.** Stale rules teach the agent
the wrong patterns, and once the team notices the file lies, they stop
trusting (and stop reading) it. So:

- After every meaningful change to the repo, ask: *"Does any rule in
  `CLAUDE.md` need updating?"* If yes, update **in the same commit**.
- Treat the "What you must NOT do" section as a growing log of lessons.
  When the agent does something undesirable, add a line. The list is
  meant to grow.
- When you remove a script, change a port, or rename a folder, grep
  `CLAUDE.md` and the docs the same minute. A 30-second sync in the same
  PR beats a 30-minute hunt later.
- If a section keeps drifting, that is a signal the information should
  not have been in `CLAUDE.md` in the first place. Move it to a script
  or to `README.md` and link out.

---

## Section-by-section: anatomy of this repo's `CLAUDE.md`

The headings below match the actual sections of
[`CLAUDE.md`](../../CLAUDE.md). Open them side by side.

### Meta section — *"What this file is and how to maintain it"*

A short preface explaining what `CLAUDE.md` is, what belongs in it, and the
maintenance rule. Three to five short bullet groups, no more. It pulls its
weight because new contributors (and future-you) immediately understand
the file's contract: "this is the agent's standing context, keep it
current, link out for everything else."

### Project at a glance

Two or three sentences naming the project and its single most important
constraint, then a short bullet list of hard constraints (no DB, no auth,
TypeScript strict, etc.). The full description, stack table, and structure
live in `README.md`; this section just orients the agent and lists the
non-negotiables that shape every diff.

### Workflow (the six steps and why this order)

The mandatory loop: **Brainstorm → Plan → Execute → Simplify → Review →
Document.** Each step names the skill or subagent that drives it and a
one-line "why this step exists" callout. The order matters:

1. **Brainstorm** before planning — clarify intent before committing to a
   design.
2. **Plan** before code — a written plan survives `/clear` and is reviewable.
3. **Execute** with the right tool — parallel subagents for independent
   tasks, main agent for tightly-coupled work.
4. **Simplify** *after* implementation — premature simplification deletes
   things you turn out to need.
5. **Review** with a fresh subagent that has not been part of the
   implementation, against the plan and `CLAUDE.md`.
6. **Document** last — docs written before the code lie; docs in the same
   commit as the code stay accurate.

This is the heart of the file. If readers remember nothing else, they
should remember the six steps.

### Code conventions per layer

Bullets grouped by concern: Frontend, Backend, Testing, TypeScript & exports.
Each bullet is concrete and one line — "Standalone components, no NgModules"
not "follow modern Angular practice." Layered headings let the agent skip
to the relevant section. Keep these to what cannot be inferred from
`tsconfig.json` or `eslint.config.js`; if the linter already enforces it,
the rule does not need to live here.

### What you must NOT do

The hardest-working section. Each bullet is the residue of a real bad
interaction. "Do not regenerate `results.data.ts` from any branch other
than `demo-finished`" sounds oddly specific because it is — somebody
once did, and the visual snapshot baseline broke. Prohibitions are easier
to follow than positive guidance, so this list earns its keep with
nearly every entry.

### Demo / context behavior

This repo has an unusual constraint: the code is projected on a screen
during a live talk. That changes priorities (clarity over cleverness,
predictable patterns, short summaries). Most repos do not have this
section, but every repo has *some* context that shapes style — a regulated
industry, a public API, a research codebase. Name it.

### Definition of done

A numbered checklist the agent literally evaluates against before
declaring a task complete. Tests pass, coverage holds, docs updated,
diff is reviewable, snapshots updated if UI changed. Without this,
"done" means whatever the agent decides.

### Commands you'll actually use

A small table of the five-to-eight commands the agent needs day-to-day.
The full table lives in `README.md`; this is an aide-memoire so the agent
does not have to read another file just to find `npm test`. If this table
grows past ten rows, you are duplicating `README.md` — trim it.

### References

Outbound links: `README.md`, `docs/plans/`, `docs/presentation/`, this
template. Lets the agent (and humans) jump to the artifact they actually
need.

---

## How to adapt this for your repo

Aim to have a working `CLAUDE.md` in under an hour.

1. **Copy this repo's `CLAUDE.md` to your repo root.** Rename headings if
   your project name differs; keep the structure.
2. **Move project description, stack table, full command list, and repo
   layout to `README.md`.** If `README.md` already has them, delete the
   duplicates from `CLAUDE.md`. The `README.md` here is a useful template.
3. **Rewrite "Project at a glance"** in two or three sentences plus a
   bullet list of hard constraints. Be specific: "no database, in-memory
   only" beats "lightweight storage."
4. **Keep the six-step Workflow section mostly verbatim.** It is general
   best practice. Swap skill names if your team uses different ones, but
   the sequence (Brainstorm → Plan → Execute → Simplify → Review → Document)
   transfers across projects.
5. **Rewrite "Code conventions" per layer** for your stack. Drop the
   Angular bullets if you are not using Angular; keep the structure
   (one heading per layer, one-line bullets, concrete rules only).
6. **Start "What you must NOT do" with three or four prohibitions** you
   already know matter (no auth, no new dependencies without discussion,
   no `--no-verify`). Plan to grow it after each bad agent run.
7. **Add a context-behavior section if your repo has one** — public API,
   regulated domain, demo, research. Skip the section if your repo is a
   normal product codebase with no special constraint.
8. **Write a "Definition of done" checklist** of six to eight items the
   agent can self-check. Steal from this repo's list as a starting point.
9. **Trim the command table to five-to-eight entries** — the ones the
   agent uses every session. Link out to `README.md` for the rest.
10. **Commit, then run the test procedure below.** Adjust the file based
    on what the agent gets wrong in the first task.

---

## Common mistakes

### Too vague

Bad: *"Write clean code."*
Good: *"Components stay under 100 lines or get decomposed."*

The agent cannot operationalize "clean." It can operationalize a line count.

### Too prescriptive

Bad: *"Use exactly two services per feature, named `XService` and `YService`."*
Good: *"Group business logic in services; routes call services."*

Over-prescription forces the agent to invent ceremony for tasks that do
not need it.

### Missing the tacit rules

The agent follows the file literally. If your team has an unwritten rule
("we never use class components", "every PR ships a changelog entry"),
write it down. The single most common cause of "the agent did the wrong
thing" is a convention that was never written.

### Outdated commands

If a script is removed from `package.json` but `CLAUDE.md` still mentions
it, the agent will try and fail. Sync the same commit. Same for renamed
folders, changed ports, retired branches.

### Treating `CLAUDE.md` as documentation

`CLAUDE.md` is not a README, not an architecture doc, not a tutorial. It
is a list of rules. If a section starts to read like prose meant to teach
the reader the project, move it to `README.md` or `docs/`.

### Letting it grow without pruning

Lines accumulate. Every quarter, re-read top to bottom and delete any
rule that no longer matches the code. Stale rules erode trust faster
than missing ones.

---

## How to test your CLAUDE.md

The verification loop is small and worth running after any meaningful
edit to `CLAUDE.md`.

Give the agent a small task that exercises several rules at once. For
example:

```
Add a one-line health-check route at GET /api/health that returns
{ status: "ok" }. Follow CLAUDE.md.
```

Then check:

- **Did the agent follow the workflow?** Did it brainstorm/plan, or did it
  jump to code? (For a one-liner, jumping is fine; for anything bigger,
  it should plan.)
- **Did the diff stay small and on-topic?** No drive-by refactors, no
  unrelated formatting changes.
- **Did it run the right test command?** `npm test` (or whatever you
  specified), not an invented one.
- **Did it update docs in the same commit?** New route, new entry in the
  command table or route list.
- **Did it produce a final summary listing changed files?** That is
  step 4 of definition of done in this repo.

If any of those fail, the corresponding rule is too quiet, buried, or
missing. Move it earlier, make it shorter, or add a "What you must NOT
do" line for the specific failure.

---

## Length and format guidelines

- **Target 200–400 lines.** This repo's `CLAUDE.md` sits around 230. Below
  100 lines is probably under-specified for non-trivial repos. Above 500
  is probably duplicating what is in the code or trying to teach the
  agent the entire framework.
- **Markdown only.** Headings, short bullets, small tables, fenced code
  blocks for commands. No HTML, no images.
- **One-line bullets where possible.** The agent reads this file every
  session; brevity compounds.
- **Tables for anything with two columns of meaning** (commands, ports,
  stack). Bullets for everything else.
- **Use blockquote callouts (`>`) sparingly** for the one or two ideas
  worth interrupting the flow for — the "why this step" notes in the
  workflow section are a good example.
