# CLAUDE.md Template Reference

> The canonical `CLAUDE.md` is at the repo root. This document explains *why*
> each section exists, so you can adapt it for other repos / talks.

---

## What CLAUDE.md is

A markdown file at the repo root that Claude Code reads before any
interaction with this codebase. It is the **single source of truth** for:

- What the project is and is not
- How the agent should make changes
- What commands to run
- What "done" looks like

Think of it as a permanent prompt prefix that doesn't take up your context window.

## How to write one (heuristics)

### Lead with project overview

Two paragraphs max. The agent should understand within 30 seconds:
- What this codebase does
- Who uses it / what it's for
- Any unusual constraint (e.g., "this is a demo, optimize for clarity")

### List the tech stack

A small table. Don't explain *why* you chose each — just say what's there.

### Show the structure

A directory tree. Skip files; show folders. The agent uses this to navigate
without reading every file.

### Explicit commands

Not "run the tests" — `npm test`. The agent will execute these literally.

### Workflow rules (most important)

This is where you encode your team's actual practices:
- Plan first, code second
- Small focused diffs
- Tests required for new features
- No silent renames

Spell out the things humans on the team already know but the agent won't.

### Code style rules per layer

Frontend rules, backend rules, etc. Format and length:
- Bullet points
- Each ~one line
- Concrete (not "be clean" → "components < 100 lines or decompose")

### Definition of done

Checkable list. The agent will literally evaluate against this.

### What NOT to do

Equally important. Things like:
- "Don't add a database"
- "Don't introduce abstractions for hypothetical future needs"
- "Don't bypass hooks"

This list often grows after each interaction where the agent did something
you didn't want.

---

## Sections in our CLAUDE.md

| Section | Purpose | Why it matters |
|---------|---------|----------------|
| Project overview | Set context | Agent doesn't waste tokens guessing |
| Tech stack | What's available | Agent picks the right APIs |
| Repository structure | Map | Agent navigates without searching |
| Commands | Exact recipes | Agent runs the right scripts |
| Workflow rules | Process | Encodes team practices |
| Frontend rules | Layer-specific | Keeps Angular code consistent |
| Backend rules | Layer-specific | Keeps Express code consistent |
| Testing rules | Quality gate | Tests get written; coverage stays up |
| Demo behavior | Context-specific | This is a demo, optimize for clarity |
| Definition of done | Checklist | Agent self-verifies before stopping |
| References | Links to plans/docs | Agent finds the design doc |

---

## Length

Our CLAUDE.md is around 250 lines / 12KB. That's a comfortable upper bound.

Below 100 lines: probably under-specified for non-trivial repos.
Above 500 lines: probably duplicating what's in the code or trying to teach
the agent the entire framework.

---

## Adapting for a new repo (recipe)

1. Copy our `CLAUDE.md` to your repo as a starting point
2. Replace "Project overview" with yours
3. Replace tech stack table with yours
4. Replace structure tree
5. Replace commands with your actual `package.json` scripts
6. Keep "Workflow rules" mostly verbatim — they're general best practice
7. Adapt "Frontend / Backend rules" to your framework
8. Define what "done" means for your team
9. Add a "What NOT to do" section based on previous bad agent behaviors
10. Commit and use it for one week. Edit when you notice the agent doing
    something you didn't want.

---

## Common mistakes

### Too vague

❌ "Write clean code"
✅ "Components stay under 100 lines or get decomposed."

### Too prescriptive

❌ "Use exactly two services per feature, named X and Y"
✅ "Group business logic in services; routes call services."

### Missing the unwritten rules

The agent will follow the file literally. If your team has a tacit rule
("we never use class components"), write it down.

### Outdated commands

If a script is removed from `package.json` but `CLAUDE.md` still mentions
it, the agent will try and fail. Keep this synced.

---

## Testing your CLAUDE.md

Run a small task:

```
Add a one-line health check to the backend. Follow CLAUDE.md.
```

Then:
- Did the agent read CLAUDE.md? (It should mention the file or your conventions)
- Did the diff stay small?
- Did the agent run tests?
- Did the agent provide a summary?

If any of those fail, the corresponding section needs to be louder / earlier
in CLAUDE.md.
