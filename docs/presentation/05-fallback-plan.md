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
   Is Claude Code              Refresh the browser tab on
   responding to prompts?      the LIVE URL — it's deployed,
        │                      not local, so it should still
   ┌────┴────┐                  work even if local dies.
   Yes       No                 │
   │         │                  Skip Phase 3 dispatch entirely
   │         Has it been > 30s? and proceed to Phase 4
   │         │                  using the live URL.
   │     Type into chat:
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
- Shift focus from terminal to the browser tab on the live URL.
- Continue to Phase 4 directly. The live URL is already on
  `demo-finished` — finished feature is right there.

### Scenario 4 — Local dev server crashes mid-demo (only matters if you opened a local tab)

**Symptom:** Local browser tab shows "site unreachable" or compile
error in terminal.

**Action:**
- The live URL still works (it's deployed, not local). Switch to that tab
  on the projector.
- Optionally, in a fresh terminal: `npm run dev` and wait 15-20s.
- If you never had a local tab open, this scenario doesn't apply.

### Scenario 5 — Live URL itself is unreachable

**Symptom:** `https://presentation.vladimirbujanovic.com` times out or
shows Render's cold-start splash longer than ~30s.

**Action:**
- First request after 15 min idle = ~30s cold start. **Wait, don't panic.**
  `npm run preshow` warm-up should have prevented this — but if it didn't,
  acknowledge: *"first request waking the free-tier service, give it 30
  seconds."*
- If still down after 60s, fall back to local: in terminal,
  `git checkout demo-finished && npm run dev`, open
  `http://localhost:4300`. Slower setup but works offline.

### Scenario 6 — Tests fail unexpectedly when running live

**Symptom:** `npm test` shows red mid-demo.

**Action:**
- Don't panic. Don't read the failing test out loud.
- Say: *"I had this passing in pre-show — let me show you the test report
  instead."*
- Open `coverage/index.html` from `docs/presentation/backup/` (recorded
  in week 4) or screenshot fallback.
- Continue to slide 7.

### Scenario 7 — Playwright browser doesn't open

**Symptom:** `npm run e2e` errors out.

**Action:**
- Show the screenshot at `docs/presentation/backup/playwright-pass.png`
  (recorded in week 4)
- Say: *"The Playwright run takes about 30 seconds. Here's what it produces."*

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

### Scenario 10 — The QR code / link from slide 9 doesn't work

**Symptom:** Audience can't reach your local /feedback page.

**Action:**
- Take questions verbally. The audience came for the talk, not the gimmick.
- Don't spend more than 30 seconds debugging the link in front of them.

### Scenario 11 — Prompt 5 (`/simplify`) or Prompt 6 (`code-reviewer`) hangs

**Symptom:** No output for 30+ seconds after pasting Prompt 5 or Prompt 6
on `demo-finished`.

**Action:**
- **Just skip.** The audience already saw the diff and a green test run —
  the workflow story is intact without these two steps.
- Say: *"Steps 4 and 5 of the workflow look like this in normal use. We've
  already seen the result they verify, so let's keep moving."*
- Continue to the coverage section / Slide 7. Do not retry.

---

## Pre-rehearsal recovery drill

Before every full rehearsal, deliberately trigger one failure to practice
the recovery:

| Drill | Trigger |
|-------|---------|
| Drill 1 | Disconnect Wi-Fi mid-Phase 3: prove you can fall back to local `git checkout demo-finished && npm run dev` and finish |
| Drill 2 | Skip Phase 3 entirely: jump straight to the live URL on slide 6 after Slide 5, narrate as if dispatch finished |
| Drill 3 | Fail a test on purpose: temporarily break a validator, run `npm test`, recover |

Practice the recovery 3 times. Then it's reflex.

---

## Hard cuts (in order, when running over)

If you reach Slide 6 past minute 21, do **all** of these in sequence:

1. **Skip Prompt 7 (docs update) first** — it's the cheapest cut, no
   visible loss to the audience
2. Skip Prompt 6 (code-reviewer subagent) next
3. Skip Prompt 5 (`/simplify`) if still over
4. Skip `npm run coverage` — just say "coverage is at 80%+"
5. Trim Slide 9 (Conclusion) to 45 seconds — keep the takeaway and the "fast junior / senior" closer
6. **Do not skip Slide 8 (Limits).** It's the credibility anchor.

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
