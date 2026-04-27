# mitto-ai-presentation

A presentation application that demonstrates how Claude Code delivers full-stack
features through a disciplined workflow. The app **renders the slides** of the
presentation itself and serves as the **live demo target** the agent works on.

## Stack

- **Frontend:** Angular 21 + Angular Material
- **Backend:** Node.js + Express + TypeScript
- **Tests:** Jest (unit + integration), Playwright (e2e), Supertest (HTTP)
- **Workspace:** npm workspaces

## Quick start

```bash
npm install            # installs all workspaces
npm run dev            # runs frontend (:4200) and backend (:3000) concurrently
npm test               # unit + integration tests across workspaces
npm run e2e            # Playwright end-to-end tests
npm run coverage       # full coverage report
```

## Repository layout

```
apps/web/      Angular app (slides + demo features)
server/        Express backend
e2e/           Playwright tests
docs/          Design, presentation, setup documentation
.claude/       Claude Code project config and plugin references
CLAUDE.md      Canonical project context for AI agents
```

## Documentation

- [Project context for AI agents](./CLAUDE.md)
- [Presentation design](./docs/plans/2026-04-27-presentation-design.md)
- [Repo setup guide](./docs/setup/01-repo-setup.md)
- [Slide content](./docs/presentation/02-slide-content.md)
- [Presenter cheatsheet](./docs/presentation/03-presenter-cheatsheet.md)

## Branches

- `main` — initial state with slides and skeleton (used as starting point in the live demo)
- `demo-finished` — full Audience Q&A feature with all tests (fallback for live demo)

## License

Internal demo project. Not for redistribution.
