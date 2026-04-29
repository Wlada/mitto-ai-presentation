# Rehearsal Checklist

> 4-week prep plan with specific actions per week. Each rehearsal is timed
> with a stopwatch. Do not move past a week if its checks aren't done.

---

## Week 1 — Repo and content (already done if you're reading this)

- [x] Repo scaffolded, builds, tests pass
- [x] CLAUDE.md written
- [x] Demo-finished branch with Q&A feature
- [x] Slide 1-11 placeholders rendering
- [x] All design docs in `docs/`

If anything above is **not** checked, finish Week 1 before moving on.

---

## Week 2 — Refine slides and feature polish

### Tuesday — Slide content polish (2 hours)
- [ ] Replace placeholder content in slide components with real text from
      `docs/presentation/02-slide-content.md`
- [ ] Verify each slide renders cleanly at 1080p and 4K
- [ ] Verify keyboard navigation (arrows, space, home, end) works
- [ ] Verify slide counter and progress dots update correctly

### Thursday — Demo polish (2 hours)
- [ ] Open `/feedback` on `demo-finished` and click through the entire flow
- [ ] Verify Material UI looks polished, no dev warnings in console
- [ ] Verify list polling works (open in two browser tabs, submit in one,
      see in the other within 3-4 seconds)
- [ ] Verify error states (submit empty form, server down, etc.)
- [ ] Verify slide 6 "Try the demo feature" link works on `demo-finished`
- [ ] Run `npm run results:refresh` and open Slide 7 in the browser; confirm
      the test counts and coverage percentages look right

### Saturday — Read-through (1 hour)
- [ ] Read `02-slide-content.md` aloud, slide by slide. Time each one.
      Mark slides over 90 seconds for trimming.
- [ ] Read the cheatsheet phases aloud. Verify they flow naturally.

---

## Week 3 — Practice runs

### Monday — First full run (45 min including post-mortem)
- [ ] Set a 30-min timer
- [ ] Run the entire flow: slides → live → result → conclusion
- [ ] Use the prepared prompts as written. Don't improvise.
- [ ] When the timer rings, **stop wherever you are**
- [ ] After: write notes on what felt slow, what felt rushed, what failed

### Wednesday — Second run with deliberate failures (60 min)
- [ ] Same setup
- [ ] Run Drill 1 (kill backend during demo). Recover per fallback plan.
- [ ] Continue the talk after recovery
- [ ] Note what surprised you

### Friday — Third run, end-to-end clean (45 min)
- [ ] Set 30-min timer
- [ ] Goal: finish at 28:00 ± 1:00
- [ ] No stops, no pauses to think
- [ ] If you finish at 26:00, you're talking too fast — slow down for slide 8
- [ ] If you finish at 32:00, identify what to cut next time
- [ ] **Verify Prompt 5 (`/simplify`) actually runs end-to-end on
      `demo-finished`** — skill installed, responds with output in <60s
- [ ] **Verify Prompt 6 (`code-reviewer`) actually runs end-to-end on
      `demo-finished`** — subagent installed, returns review in <90s
- [ ] If either skill is missing or unresponsive, install / fix this week —
      do not discover it on stage

### Saturday — Record yourself (45 min)
- [ ] Phone propped up, video the whole rehearsal
- [ ] Watch it back the same day (this is uncomfortable but necessary)
- [ ] Note: filler words, hand-on-face tics, eyes on screen vs audience

---

## Week 4 — Final polish and backups

### Tuesday — Backup artifacts (2 hours)

Record once, save permanently:

- [ ] Screencast of full live flow on `demo-finished`:
      save to `docs/presentation/backup/feedback-demo.mp4`
- [ ] Screenshot of passing test output:
      `docs/presentation/backup/tests-pass.png`
- [ ] Screenshot of Playwright HTML report:
      `docs/presentation/backup/playwright-pass.png`
- [ ] Screenshot of `code-reviewer` subagent output (Prompt 6):
      `docs/presentation/backup/code-review.png`
- [ ] Snapshot of `coverage/` directory:
      `docs/presentation/backup/coverage-snapshot/` (zip if large)
- [ ] Verify visual regression baselines pass at projector resolution:
      run `npm run e2e` once on the actual screen you'll present from. If
      diffs appear, re-baseline with
      `npm --workspace e2e run test -- --update-snapshots` and commit.

These are your safety net. If anything fails live, you show these instead.

### Thursday — Generalna proba (60 min)
- [ ] Full dress rehearsal: actual presentation room if possible
- [ ] Real laptop, real screen, real Wi-Fi
- [ ] Time it. Note any environment-specific issues (font size on projector,
      colors washing out, audio echo)

### Friday before the talk — Last touch (30 min)
- [ ] One final read-through of cheatsheet
- [ ] One final dry-run of just the live flow (Phase 3) — 10 minutes
- [ ] Print the cheatsheet on paper (don't rely on a second device)
- [ ] Check `git log` on both branches — make sure you know what's where

### Day of — Morning checklist (5 min)
- [ ] Laptop charged 100%
- [ ] Charger packed
- [ ] Cheatsheet (paper) packed
- [ ] One bottle of water
- [ ] Eat something. Don't present hungry.

### 30 minutes before — Setup (per cheatsheet "Pre-show checklist")

---

## Anti-checklist (DO NOT do these)

- ❌ Do not change the slides the day of the talk
- ❌ Do not try a new prompt for the first time live
- ❌ Do not update Claude Code or dependencies the week of the talk
- ❌ Do not present on a laptop that auto-installed updates this morning
- ❌ Do not skip the pre-show checklist — every item exists because it
  failed in someone's rehearsal

---

## Confidence indicators

You're ready to go live when:

- You've timed three rehearsals and all finished within 28-31 minutes
- You can recover from at least 2 of the 3 drills without the audience noticing
- You've watched at least one rehearsal video back without cringing more than
  3 times
- You can recite Slide 3's central message ("CLAUDE.md, skills, subagents")
  without looking
- You can recite the 6-step workflow (brainstorm → plan → execute →
  simplify → review → document) without looking
- You can find any prompt in `04-prepared-prompts.md` within 5 seconds

If any of those is no, do one more rehearsal.
