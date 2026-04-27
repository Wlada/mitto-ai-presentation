# @mitto-ai-presentation/server

Express + TypeScript backend for the `mitto-ai-presentation` monorepo. Serves
the API consumed by the Angular app in `apps/web`. Storage is in-memory by
design — no database.

Runs on **port 3000**. CORS is open to `http://localhost:4200` (the Angular
dev server).

## Commands

Run from the repo root (uses npm workspaces):

| Command | What it does |
|---------|--------------|
| `npm run dev:server` | Start the API in watch mode (tsx) on :3000 |
| `npm run test:server` | Run unit + integration tests (Vitest + Supertest) |
| `npm -w @mitto-ai-presentation/server run build` | Type-check and emit to `dist/` |

Or from this workspace directly:

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the API in watch mode on :3000 |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run coverage` | Run tests with v8 coverage (80% thresholds) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server from `dist/` |
| `npm run lint` | Lint `src/` |

## Layout

```
server/
├── src/
│   ├── index.ts          # bootstrap: createApp() + app.listen
│   ├── app.ts            # createApp() factory (Supertest-friendly)
│   ├── routes/           # thin route handlers
│   ├── services/         # business logic (added with features)
│   ├── validators/       # input validation (added with features)
│   └── data/             # in-memory stores (added with features)
└── tests/                # Supertest integration tests
```

Routes are thin: parse -> validate -> service -> respond. Errors use the
shape `{ error: { message, details? } }`.
