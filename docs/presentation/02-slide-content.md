# Slide Content

> Slide text in English (what the audience sees). Speaker notes also in
> English below each slide (what you say, reminders).
>
> **Language:** English everywhere — slide and notes.
> **Format guideline:** few words on slide. You explain. Don't read the slide aloud.

---

## Slide 1 — Title

```
Claude Code in Practice
AI agents in everyday work

Vladimir Bujanovic · Mitto · 2026
```

**Speaker notes:**
- Greet the audience, introduce yourself briefly.
- Say: *"Hi everyone, thanks for being here. My name is Vladimir and today I'll show you how I've been getting the best results out of Claude Code and what that means for our day-to-day work."*
- Set the expectation: the next 30 minutes are about how it actually works in practice, not the marketing pitch.
- Move on in 30-45 seconds. **Don't dwell on the intro.**

---

## Slide 2 — Claude Code CLI

```
Claude Code CLI

A local CLI agent that:
  reads your repo
  edits your files
  runs your commands
  follows project-specific rules

Works in your terminal. You decide what runs.
```

**Speaker notes:**
- Say: *"Claude Code CLI is a local CLI agent that lives in your terminal. It can read the repo, edit files, run commands, and follow project-specific rules."*
- Emphasise: *"We decide what runs and what gets executed."*
- Open the terminal with Claude Code in a short demo if there's time (optional — the slide is enough).
- 60-90 seconds.

---

## Slide 3 — The problem with Chat agent

```
The problem with Chat agent

  Copy / paste cycle: code in, edits, code back out.
  Without project context, the agent guesses.
  Without a workflow, it skips review steps.
  Without rules, it adds dependencies you don't want.

The fix:

  CLAUDE.md   →  permanent project rules
  Skills      →  reusable workflows
  Subagents   →  parallel, specialized work
```

**Speaker notes:**
- Say: *"If we use a chat tool — like ChatGPT — for coding, we end up in a copy/paste cycle: code in, edits, code back out. The chat agent doesn't know the project context. It has no specific workflow, so it can skip things or do them in a different way. Without rules, it can add dependencies we don't want."*
- The fix — three short lines, one per concept:
  - *"Three things fix this. First, CLAUDE.md. It's a file in the repo that tells the agent the project rules — what stack, what tests, what not to do. The agent reads it every time."*
  - *"Second, Skills. A skill is a saved workflow you call with a slash command. The agent follows the same steps every time, instead of inventing them."*
  - *"Third, Subagents. A subagent is a separate Claude with one job and its own memory. We use them for parallel work, and for a fresh code review from a different agent."*
- This is the *most important conceptual slide*. The audience should leave with: a prompt is not enough.
- 90 seconds.

---

## Slide 4 — Today's demo app

```
Today's demo app

  "Add an Audience Q&A feature."

  Frontend: Angular 21 + Material
  Backend:  Node + Express + TypeScript
  E2E:      Playwright
  CLAUDE.md: the project context file

  apps/web/      Angular 21 + Material
  server/        Node + Express + TypeScript
  e2e/           Playwright
  CLAUDE.md      The project context file

The slides you're seeing now were built with this same setup.
```

**Speaker notes:**
- Say: *"In today's demo app we'll add a Q&A feature. We use a standard stack — Angular, Express, Playwright. The interesting part is the CLAUDE.md file at the top."*
- Then point to the closing line on the slide: *"And one more thing — the slides you're looking at right now were built with this same setup. Same Angular components, same CLAUDE.md, same tests. The thing the agent works on during the demo IS the slides app."*
- Open VS Code on the second monitor. Show the repo structure. Open `CLAUDE.md`.
- Show the key sections: workflow rules, frontend rules, definition of done.
- *"This is the file Claude reads before every interaction with the repo. You don't have to write a novel — ours is around 250 lines."*
- 2-3 minutes. **Longest section before the live demo.**

---

## Slide 5 — What the agent will do

```
What the agent will do

  1.  Brainstorm the feature   (asks me questions)
  2.  Write the plan           (commits to a doc)
  3.  Dispatch subagents       (parallel work)
  4.  Run tests                (verifies its own output)
  5.  Summarize                (reports what changed)

You'll see steps 1–3 live.
Steps 4–5 take longer; we'll jump to a finished result.
```

**Speaker notes:**
- Say: *"We'll see how the agent runs an end-to-end feature. We'll walk through brainstorming, planning, and subagent execution — but we won't wait for the whole feature, because that takes 15-20 minutes. The agent also writes unit + integration tests, plus Playwright e2e tests."*
- Emphasise: *"These steps are skills and patterns inside Claude Code, defined in this repo's CLAUDE.md. Not magic, not my invention — a canonical workflow."*
- *"You'll see steps 1, 2, 3 live on `main`. Then I cut and switch to `demo-finished` where the result is already there."*
- Literally explain: *"I type one prompt. You see what happens."*
- Move to the cheatsheet — the next part is live, not slides.

**LIVE FLOW STARTS HERE.** See `04-prepared-prompts.md` and `03-presenter-cheatsheet.md`.

---

## Slide 6 — What we produced

```
What we produced

[ Try the demo feature -> ]

   68 tests              89% backend coverage
   16 Playwright         84% frontend coverage

After writing the code, the agent also:
  - Cleaned up the code
  - Reviewed it
  - Updated the docs

We can make these three steps standard in every task.
```

Live numbers on this slide come from
`apps/web/src/app/slides/slide-06-results/results.data.ts`, regenerated by
`npm run results:refresh` before the talk.

**Speaker notes:**
- *"Here's what came out of this workflow — a working feature, with tests, in this repo. Let me show it."* Click the **Try the demo feature** button and walk through the `/feedback` page for ~10 seconds.
- *"68 unit and integration tests, 89% backend coverage, 84% frontend, and 16 Playwright tests covering the slides and the Q&A page."*
- *"And the agent didn't just write code. It also cleaned it up, reviewed its own work, and updated the docs. Those are three separate steps in the workflow — Simplify, Review, Document — and we can ask for them every time, or make them a standing rule in `CLAUDE.md` so they happen on every task."*
- *"Coverage is not the goal, but it's a signal the agent didn't skip tests."*
- 60–90 seconds total.

---

## Slide 7 — What agents do well

```
What agents are good at

  Adding new features that follow patterns you already have
  Writing tests
  Wiring up components, routes, services
  Cleaning up repetitive code
  Writing and updating docs
```

**Speaker notes:**
- Coming back to slides after the live demo.
- *"Everything you just saw — adding forms, routes, validation, tests, and the doc updates from slide 6 — those are tasks agents handle well. We don't ask them for creative or architectural decisions, we ask them to repeat patterns we already have in the code."*
- *"The rule behind all this: a clear task with a clear result. The more open-ended the task, the worse it tends to go."*
- 60 seconds.

---

## Slide 8 — Limits and risks

```
Where it can go wrong

  Silent wrong guesses
  Doing more than asked
  Tests that pass but don't really test
  Sounds sure even when it is wrong
  Cleanups that break other things

Stay safe: small tasks, plan first, review every change.
```

**Speaker notes:**
- This is the credibility slide. Don't skip the risks.
- *"Each of these has happened to me at least once. The worst one is the first: the agent makes a wrong guess, doesn't ask about it, and only the diff shows what it did. So you have to read the diff every time."*
- If you have a personal example, share one. (E.g. *"I had an agent add a library we didn't need — I caught it in the review."*)
- *"This is why we plan first. The plan shows the wrong choice before any code is written."*
- 90 seconds. **The strongest moment after the live demo — don't rush.**

---

## Slide 9 — Conclusion

```
Takeaway

  It's a faster, controlled cycle
  where the developer stays the owner.

Treat the agent as a fast junior.
Treat yourself as the senior.

Licenses are coming soon. I'm here for questions
and happy to share what I learned.

Thank you.

→ Leave a question or comment
```

**Speaker notes:**
- Don't read the slide. Say the takeaway in your own words.
- *"If you'd remember one thing from this talk — that's it. The fast junior / senior framing is the simplest way to think about your role."*
- *"Licenses for Claude Code or Codex are coming soon, so you'll all get to try this. Until then I'm here for questions, or come find me after — happy to share what I learned along the way."*
- Pause. Pause again. Don't rush "Thank you".
- Invite questions via the Q&A link on the slide.
- Leave 3-5 minutes for questions.

---

## Cross-cutting reminders

- **Don't read the slide.** Glance at it, then look at the audience.
- **Move on quickly from intro.** Most of the value is in slides 3-5 (concept + live).
- **If you forget what to say — pause.** Silence reads as confidence. Filler words don't.
- **Time check at slide 7.** If past 26 min, trim Slide 8 (Limits) to one strong example so you still land Slide 9 (Conclusion) cleanly.
