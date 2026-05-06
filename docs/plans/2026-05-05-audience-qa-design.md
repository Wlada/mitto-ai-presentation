# Audience Q&A page — design

**Date:** 2026-05-05
**Scope:** New `/feedback` page where anyone in the room can post a question,
comment, or suggestion and see a live list. Establishes the first real
backend feature stack (`routes / services / data / validators`) for this
repo.

UI is locked by the requester. This document covers the parts that are not.

---

## Decisions (brainstorm summary)

| # | Question | Choice | Why |
|---|----------|--------|-----|
| 1 | How does the list stay live? | **2s polling** | Honors "appear automatically"; trivial to read on the projector; load is negligible for a 30-min talk. SSE/websockets ruled out by CLAUDE.md and clarity goals. |
| 2 | Moderation? | **None** | Trust the room. Keeps locked UI intact and code minimal. |
| 3 | Filter chips | **Client-side** | Tiny list, instant chip response, single trivial GET. |
| 4 | Submit UX | **Wait for POST response, then insert** | Linear code, server is source of truth, latency is sub-perceptible on localhost. |
| 5 | Initial state | **Empty** | The empty state is part of the spec; "be the first to ask" works as a live prompt. No seed data in code. |

---

## File layout

### Backend

```
server/src/
  data/feedback.ts            # in-memory store: array + helpers
  validators/feedback.ts      # createFeedbackInput → {ok,value} | {ok,errors}
  services/feedback.ts        # list(), create(input)
  routes/feedback.ts          # GET /api/feedback, POST /api/feedback
  routes/index.ts             # add: export { feedbackRouter }
  app.ts                      # mount: app.use('/api/feedback', feedbackRouter)
```

This is the canonical layer pattern from CLAUDE.md. Future features copy
this shape.

### Frontend

```
apps/web/src/app/feedback/
  feedback.ts                 # standalone component, OnPush, signals
  feedback.html
  feedback.scss
  feedback.service.ts         # HttpClient wrapper: list(), create()
  feedback.types.ts           # shared FeedbackEntry, FeedbackType
  feedback.spec.ts
  feedback.service.spec.ts
```

### Routing

- `apps/web/src/app/app.routes.ts` — add a top-level `feedback` route
  (lazy-loaded standalone component). It is **not** a slide and stays
  out of `slide.config.ts` and `slides.routes.ts`.
- `apps/web/src/app/slides/slide-05-demo-task/` — add a small
  "Open audience Q&A" link/button so the page is reachable during
  the talk. The "Back to slide 5" button on `/feedback` returns
  via `routerLink="/slides/5"`.

---

## Data shapes

```ts
export type FeedbackType = 'question' | 'comment' | 'suggestion';

export interface FeedbackEntry {
  id: string;          // crypto.randomUUID()
  name: string | null; // null when omitted (not '')
  type: FeedbackType;
  message: string;     // trimmed
  createdAt: string;   // ISO 8601
}

export interface CreateFeedbackInput {
  name?: string;
  type: FeedbackType;
  message: string;
}
```

The frontend imports these types from `feedback.types.ts`. The backend
declares the same shape next to the service (no shared package — this
repo deliberately doesn't have one yet).

---

## API

### `GET /api/feedback`

Response `200`:

```json
{ "entries": [FeedbackEntry, ...] }
```

Newest first. No query params (filtering is client-side).

### `POST /api/feedback`

Request body = `CreateFeedbackInput`.

- `201` →

  ```json
  { "entry": FeedbackEntry }
  ```

- `400` → uniform error envelope per CLAUDE.md:

  ```json
  { "error": { "message": "Validation failed", "details": { ... } } }
  ```

### Validation rules

| Field | Rule |
|-------|------|
| `name` | Optional. Trim. Max 50. Empty after trim → stored as `null`. |
| `type` | Required. Must be `"question" \| "comment" \| "suggestion"`. |
| `message` | Required. Trim. Length 1–500 after trim. |

Validator returns `{ ok: true; value } | { ok: false; errors }`. Routes
never throw for validation failures.

### Storage

`data/feedback.ts` holds a module-level `const entries: FeedbackEntry[] = []`.

- `list()` returns a fresh shallow copy.
- `create(entry)` `unshift`s — newest first; no sort needed on read.
- State resets on process restart, by design (CLAUDE.md hard constraint).

---

## Frontend component

### State (signals, `OnPush`)

- `entries = signal<FeedbackEntry[]>([])`
- `activeFilter = signal<'all' | FeedbackType>('all')`
- `filtered = computed(() => activeFilter() === 'all'
    ? entries()
    : entries().filter(e => e.type === activeFilter()))`
- `submitting = signal(false)`

### Form (reactive)

```ts
this.fb.group({
  name: ['', [Validators.maxLength(50)]],
  type: ['question', Validators.required],
  message: ['', [Validators.required, Validators.maxLength(500)]],
})
```

Submit button: `disabled = form.invalid || submitting()`.

### Polling

- `ngOnInit`: one immediate `list()`, then `setInterval(2000)` of `list()`.
- `ngOnDestroy`: `clearInterval`.
- Poll failure: silent `console.warn`. Next tick retries — no toast spam
  on the projector.

### Submit flow

```
submitting.set(true)
  → service.create(value)
    → on success: entries.update(prev => [entry, ...prev])
                  form.reset({ type: 'question' })
    → on error:   snackBar.open('Could not send — try again.')
  → submitting.set(false)
```

### Char counters

`mat-hint align="end"` reading the live form value length / max. Two of
them: name (X/50), message (X/500).

### "Back to slide 5"

`<a mat-button routerLink="/slides/5">Back to slide 5</a>` pinned
top-left of the page wrapper.

---

## Tests

### Backend (Vitest + supertest)

- `validators/feedback.spec.ts` — happy path; reject missing message;
  reject message > 500 after trim; reject unknown type; reject name > 50;
  name = "   " → stored as `null`.
- `services/feedback.spec.ts` — `create` then `list` returns newest
  first; `list` returns a copy (mutating result doesn't affect store).
- `routes/feedback.spec.ts` — `201` on valid POST with shape; `400`
  uniform error on invalid POST; `GET` returns `{ entries: [...] }`.

### Frontend (Vitest + Angular testing)

- `feedback.service.spec.ts` — `HttpTestingController` for `list()` and
  `create()`.
- `feedback.spec.ts` — empty state visible initially; rendering after
  `entries.set([...])`; chip click changes `activeFilter`; submit
  disabled when message empty; submit calls service and prepends the
  returned entry.

### E2E (Playwright, one spec)

`e2e/specs/feedback.spec.ts`:

- Visit `/feedback` → empty state text visible.
- Fill name + message, click Submit → entry appears at top of right panel.
- Click "Comment" chip → only comment entries render.
- Click "Back to slide 5" → URL is `/slides/5`.

Coverage targets per CLAUDE.md: **80% backend / 70% frontend**. Surface
area is small; both targets are easy to hit.

---

## Risks

- **Empty room.** Audience doesn't post → projector shows the empty state
  for the duration of the demo. Acceptable: the empty state is part of the
  spec, and the live "be the first" prompt usually works.
- **Process restart wipes state.** By design. If the backend crashes mid-talk
  the panel resets. Mitigated only by running `npm run preshow` before the
  session.
- **No moderation.** Someone could post something offensive on the
  projector. Decision was to accept the risk for simplicity. If this
  becomes a real concern later, add a presenter-gated hide toggle (was
  option B in the brainstorm).
- **2s polling overhead.** Negligible for <50 viewers; would need rework
  if this ever became a public-facing app (it won't).

---

## Out of scope

- Authentication, user accounts, sessions
- Persistence (DB, file, Redis) — repo forbids it
- Websockets, SSE, push notifications
- Editing or deleting entries from the audience side
- Pagination — list will never grow beyond the size of one talk
- Rate limiting — trust the room
