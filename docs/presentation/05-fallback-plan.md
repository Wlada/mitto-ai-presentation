# Fallback Plan

> What to do when something goes wrong. **Read this once before each rehearsal**
> so the responses are reflexive on the day.

---

## The two rules

**Rule 1.** No matter what fails, the audience came for the *workflow story*,
not for the live magic. You can deliver the entire value with a single
working `git diff` and a passing test suite.

**Rule 2.** Time is your enemy, not the failure. **Skip silently.** Saying
*"that didn't work"* costs you 30 seconds of credibility for nothing. Saying
*"let me move on"* costs you nothing.

---

## Decision tree

```
              Is the dev server running?
                       │
        ┌──────────────┴──────────────┐
        Yes                            No
        │                              │
   Is Claude Code              Restart in Terminal 2:
   responding to prompts?      `npm run dev`
        │                              │
   ┌────┴────┐                  Wait 10 seconds.
   Yes       No                 If still nothing,
   │         │                  skip live entirely:
   │         Has it been > 30s? `git checkout demo-finished`
   │         │
   │     Type into chat:        and proceed with Phase 4.
   │     `Are you still
   │      working? If stuck,
   │      stop and summarize.`
   │
   Continue to next phase.
```

---

## Specific failure scenarios

### Scenario 1 — Brainstorming skill takes too long or repeats itself

**Symptom:** It asks the same kind of question twice, or you've answered 6+
questions and it wants more.

**Action:**
- Type: `Skip the remaining questions. Use what you have to write the plan now.`
- Move on. Don't apologize.

### Scenario 2 — Plan document doesn't write to disk

**Symptom:** No file appears in `docs/plans/` after a minute.

**Action:**
- Type: `Just print the plan in chat. No file needed.`
- Read the chat plan to the audience instead of opening a file.

### Scenario 3 — Subagent dispatch fails or hangs

**Symptom:** Nothing happens for 30+ seconds, or you see error messages.

**Action:**
- Say (English): *"In the interest of time, here's what this would have produced."*
- Type: `git checkout demo-finished`
- Refresh browser. Continue to Phase 4 directly.

### Scenario 4 — Dev server crashes mid-demo

**Symptom:** Browser shows "site unreachable" or compile error in terminal.

**Action:**
- In a fresh terminal: `npm run dev`
- Wait 15-20 seconds for both servers to come up
- If after 30 seconds it's still broken, **abandon live demo**: open the
  pre-recorded screencast from `docs/presentation/backup/feedback-demo.mp4`
  (you'll record this in week 4)

### Scenario 5 — Tests fail unexpectedly on `demo-finished`

**Symptom:** `npm test` shows red.

**Action:**
- Don't panic. Don't read the failing test out loud.
- Say: *"I had this passing yesterday — let me show you the test report
  instead."*
- Open `coverage/index.html` from a previous successful run (you'll save one
  to `docs/presentation/backup/coverage-snapshot/` in week 4)
- Continue to slide 8

### Scenario 6 — Playwright browser doesn't open

**Symptom:** `npm run e2e` errors out.

**Action:**
- Show the screenshot at `docs/presentation/backup/playwright-pass.png`
  (recorded in week 4)
- Say: *"The Playwright run takes about 30 seconds. Here's what it produces."*

### Scenario 7 — `git checkout demo-finished` fails (uncommitted changes)

**Symptom:** Git complains about uncommitted local changes.

**Action:**
- `git stash` then `git checkout demo-finished`
- Don't try to recover the stash mid-demo. Worry about it later.

### Scenario 8 — You forget what to say next

**Symptom:** You. In your head.

**Action:**
- **Pause.** Look at the audience. 2 seconds of silence.
- Glance at this cheatsheet on your second screen / paper.
- Pick up from the next bullet. Don't apologize.

### Scenario 9 — Hostile question during Q&A

**Sample:** *"Why would I trust this? It's just a chatbot."*

**Response:**
> *"That's the question this whole talk is about. The trust comes from the
> workflow, not from the agent. Plan-first, small diffs, mandatory tests,
> mandatory review. Same controls you'd put on a junior."*

**Sample:** *"How much does this cost?"*

**Response:**
> *"Anthropic publishes per-token pricing. For the workflow you saw today,
> typical cost is in the order of cents to a few dollars per session. I'm
> happy to share specifics offline."*

**Sample:** *"Did you cherry-pick a happy case?"*

**Response:**
> *"Honest answer: yes — for time. The slides show what works. The 'Limits'
> slide listed what doesn't. I picked a feature shape the agent is good at —
> the same way I'd hand a junior a well-shaped task."*

### Scenario 10a — Visual regression snapshot test fails the morning of the demo

**Symptom:** `npm run e2e` reports diffs in `slides-visual.spec.ts`. Usually
caused by a font-rendering tweak, a Material theme bump, or a logo recolor.

**Action:**
- Run: `npm --workspace e2e run test -- --update-snapshots`
- Open the diff under `e2e/test-results/` and visually confirm the new
  baselines look correct (logo present, brand pink still pink, no broken
  layout).
- Commit the regenerated snapshots before going on stage.
- If something *does* look broken, do not commit — fall back to the previous
  baseline by `git checkout e2e/tests/slides-visual.spec.ts-snapshots/` and
  fix the underlying styling instead.

### Scenario 10 — The QR code / link from slide 12 doesn't work

**Symptom:** Audience can't reach your local /feedback page.

**Action:**
- Take questions verbally. The audience came for the talk, not the gimmick.
- Don't spend more than 30 seconds debugging the link in front of them.

---

## Pre-rehearsal recovery drill

Before every full rehearsal, deliberately trigger one failure to practice
the recovery:

| Drill | Trigger |
|-------|---------|
| Drill 1 | Kill the backend mid-demo: `pkill -f "tsx watch"` |
| Drill 2 | Skip Phase 3 entirely: jump straight to `git checkout demo-finished` after Slide 7 |
| Drill 3 | Fail a test on purpose: temporarily break a validator, run `npm test`, recover |

Practice the recovery 3 times. Then it's reflex.

---

## Hard cuts (in order, when running over)

If you reach Slide 8 past minute 22, do **all** of these in sequence:

1. Skip the code-reviewer subagent demo
2. Skip `npm run coverage` — just say "coverage is at 80%+"
3. Combine Slide 11 (Team model) + 12 (Conclusion) into one minute
4. **Do not skip Slide 10 (Limits).** It's the credibility anchor.

---

## What you DON'T need a fallback for

- **Audience asking "how do I install this?"** — Answer: *"There are docs in
  the repo. I can share the link."*
- **Audience asking about other AI tools** — Answer: *"I'm focused on this
  one. Most of the workflow ideas transfer."*
- **Audience asking about future Anthropic plans** — Answer: *"I don't know.
  Anthropic doesn't share roadmap with me."*
- **Audience disagreeing with you** — Answer: *"That's fair. This is one
  approach. Try it for a week and form your own view."*

---

## Final pre-show fallback

If, 5 minutes before going live, **anything** about the live setup is
broken — laptop, dev server, Claude Code, network — switch to the pre-built
walkthrough:

1. Open `git log --oneline main..demo-finished` in terminal
2. Walk the audience through commits one by one
3. Show files in VS Code instead of running them
4. The "Live Flow" slide becomes "Here's what the agent did over an hour"

This is a 90% as effective talk. Better to deliver this than to flail with a
broken demo.
