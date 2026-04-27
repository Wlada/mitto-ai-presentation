# `@mitto-ai-presentation/e2e`

Playwright end-to-end tests for the `mitto-ai-presentation` monorepo. This
workspace exercises the Angular app (and the Express backend behind it)
through a real browser.

## Layout

```
e2e/
├── playwright.config.ts   # Playwright config (chromium-only by default)
├── tests/                 # Specs live here
│   └── health.spec.ts     # Smoke test verifying the dev server is reachable
└── test-results/          # Per-run artifacts (gitignored)
```

## Prerequisites

From the repository root, install all workspace dependencies once:

```sh
npm install
```

Then install the Playwright browser binaries (one-time, per machine):

```sh
npx playwright install
```

## Running tests

The `playwright.config.ts` `webServer` block starts `npm run dev` in the repo
root automatically and waits for `http://localhost:4300`. You do not need to
start the dev server manually.

### From the repo root

```sh
npm run e2e         # Run e2e tests against an already-running dev server
npm run e2e:ci      # Start dev server, run e2e tests, shut down
```

### From this workspace

```sh
npm test            # Run all specs (HTML reporter)
npm run test:ci     # Line reporter, suitable for CI logs
npm run test:headed # Run with a visible browser window
npm run test:ui     # Open the Playwright UI runner
npm run report      # Open the last HTML report
```

## Conventions

- **Page Object Model** for non-trivial flows. Place page objects under
  `tests/pages/` once they appear.
- Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors.
- Never use `page.waitForTimeout()`. Rely on Playwright's auto-waiting via
  `expect(locator).toBeVisible()` and similar assertions.
- Strict TypeScript. No `any`.

## Adding a spec

1. Create `tests/<feature>.spec.ts`.
2. Use `test.describe` to group related cases.
3. Reuse fixtures and page objects rather than duplicating selectors.
