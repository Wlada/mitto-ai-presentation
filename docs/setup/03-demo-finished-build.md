# Building the demo-finished branch

> How to (re)produce the `demo-finished` branch from `main`. Useful if you
> need to rebuild the demo result, fix a bug in the Q&A feature, or prove
> the workflow end-to-end as a rehearsal exercise.

---

## What's in `demo-finished` vs `main`

```
main:           slides shell + scaffold + docs
demo-finished:  main
              + Audience Q&A feature (frontend + backend + tests + e2e)
```

## Option A — Rebuild manually (fast, predictable)

Use this if `demo-finished` got into a bad state and you just need to
restore the result.

```bash
git checkout main
git branch -D demo-finished        # delete the bad branch
git checkout -b demo-finished       # fresh from main

# Re-apply the Q&A feature commits (or copy from a backup)
git cherry-pick <commit-hash-of-qna-feat>
```

Or if you have the diffs saved:

```bash
git apply path/to/saved/qna-feature.patch
```

## Option B — Rebuild via Claude Code (slow, shows the workflow)

Use this if you want to validate the actual workflow from the talk, or
record a fresh screencast for the backup.

```bash
git checkout main
git checkout -b demo-finished-redo
```

In a Claude Code session at the repo root:

1. Paste **Prompt 1** from `docs/presentation/04-prepared-prompts.md`
2. Answer brainstorm questions per the prompt doc
3. Let `/superpowers:writing-plans` write the plan
4. Let `/superpowers:subagent-driven-development` dispatch
5. Wait until all subagents complete (5-10 min)
6. Run all tests:
   ```bash
   npm test && npm run e2e
   ```
7. If green, commit:
   ```bash
   git add .
   git commit -m "feat: implement Audience Q&A feature"
   ```

If the result matches the existing `demo-finished`, replace it:

```bash
git branch -D demo-finished
git branch -m demo-finished-redo demo-finished
```

## Option C — Apply from saved patch (most reproducible)

Save the Q&A feature as a patch file once:

```bash
git checkout demo-finished
git diff main..demo-finished > docs/setup/qna-feature.patch
git checkout main
```

To rebuild later:

```bash
git checkout main
git checkout -b demo-finished
git apply docs/setup/qna-feature.patch
git add .
git commit -m "feat: Q&A feature (restored from patch)"
```

## Verifying demo-finished is good

After rebuild, in this order:

```bash
# 1. Build cleanly
npm run build

# 2. All unit + integration tests pass
npm test

# 3. Coverage at or above target
npm run coverage
# expect: server 80%+, web 70%+

# 4. E2E pass (functional + visual regression)
npm run e2e

# 5. Refresh Slide 6 numbers from this run's coverage
npm run results:refresh

# 6. Manual smoke
npm run dev
open http://localhost:4300/feedback
# Submit a question. See it appear in the list.
# Then open http://localhost:4300/slides/6 and confirm the live numbers.
```

If all six pass, `demo-finished` is rehearsal-ready.

## Pre-rehearsal cleanup

Before each rehearsal:

```bash
# Make sure both branches are clean
git checkout main && git status
git checkout demo-finished && git status

# Reset feedback storage by restarting the server
# (in-memory only, so dev server restart clears it)

# Clear any test artifacts
rm -rf e2e/test-results e2e/playwright-report apps/web/coverage server/coverage
```

## Tagging stable points

After a successful rehearsal where everything worked, tag both branches:

```bash
git tag rehearsal-2026-W3-pass main
git tag rehearsal-2026-W3-pass-result demo-finished
git push --tags
```

If a later commit breaks things, you can `git checkout rehearsal-2026-W3-pass`
to recover the known-good state.

## What `demo-finished` does NOT contain

- The plan document the agent writes during the live demo (created live)
- Any user-submitted feedback entries (storage is in-memory)
- The screencast / coverage / Playwright HTML report backups (those live in
  `docs/presentation/backup/`, are gitignored, and should be in cloud
  storage)

## Branch hygiene rules

- `main` is the baseline. Don't `git push --force` to it.
- `demo-finished` is rebuilt as needed. It's OK to force-push it.
- Don't merge `demo-finished` back to `main`. They diverge intentionally.
- If you fix a bug that affects both branches (e.g., a typo in CLAUDE.md),
  fix on `main` and cherry-pick to `demo-finished`.
