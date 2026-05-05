# Audience Q&A Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a `/feedback` page where audience members can post a question, comment, or suggestion and see a live list of recent posts.

**Architecture:** Standalone Angular component (signals + OnPush) at `/feedback`, talking to a new Express stack (`routes / services / data / validators`) on `/api/feedback`. Storage is in-memory; the right panel polls `GET /api/feedback` every 2s. UI is locked per the spec; backend pattern is the canonical layered shape this repo will reuse for all later features.

**Tech Stack:** Angular 21 (standalone, signals, Material, reactive forms), Express 5 + TypeScript, Vitest + supertest, Playwright.

---

## Design source

This plan implements `docs/plans/2026-05-05-audience-qa-design.md`. Read that doc first for the rationale behind decisions. Key choices baked in here:

- 2s polling (no websockets, no SSE).
- No moderation.
- Client-side filtering of the chip group.
- Submit waits for POST response, then prepends.
- Initial state is empty (no seed data).

Slide 5 already has a `routerLink="/feedback"` button — **no slide 5 edit is required**.

---

## Conventions to follow (from CLAUDE.md)

- Validators return `{ ok: true; value } | { ok: false; errors }`. Never throw for validation.
- Routes are thin: parse → validate → service → respond.
- Uniform error envelope: `{ error: { message, details? } }`.
- Standalone components, `OnPush`, signals, reactive forms.
- File naming: `*.ts` not `*.component.ts`.
- Named exports only.
- Default to no comments. One short line max if a *why* is non-obvious.
- Coverage targets: 80% backend, 70% frontend.

---

## Task 1: Backend — types and in-memory store

**Files:**
- Create: `server/src/data/feedback.ts`
- Create: `server/tests/feedback-data.spec.ts`

**Step 1: Write the failing tests**

```ts
// server/tests/feedback-data.spec.ts
import { describe, expect, it, beforeEach } from 'vitest';
import { resetFeedback, listFeedback, addFeedback } from '../src/data/feedback.js';
import type { FeedbackEntry } from '../src/data/feedback.js';

const sample: FeedbackEntry = {
  id: 'a',
  name: null,
  type: 'question',
  message: 'Hi',
  createdAt: '2026-05-05T10:00:00.000Z',
};

describe('feedback data store', () => {
  beforeEach(() => resetFeedback());

  it('starts empty', () => {
    expect(listFeedback()).toEqual([]);
  });

  it('addFeedback unshifts so newest is first', () => {
    addFeedback({ ...sample, id: '1' });
    addFeedback({ ...sample, id: '2' });
    expect(listFeedback().map((e) => e.id)).toEqual(['2', '1']);
  });

  it('listFeedback returns a copy (mutation does not affect store)', () => {
    addFeedback({ ...sample, id: '1' });
    const out = listFeedback();
    out.pop();
    expect(listFeedback()).toHaveLength(1);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace server test -- feedback-data
```

Expected: FAIL — module `../src/data/feedback.js` does not exist.

**Step 3: Write minimal implementation**

```ts
// server/src/data/feedback.ts
export type FeedbackType = 'question' | 'comment' | 'suggestion';

export interface FeedbackEntry {
  id: string;
  name: string | null;
  type: FeedbackType;
  message: string;
  createdAt: string;
}

const entries: FeedbackEntry[] = [];

export function listFeedback(): FeedbackEntry[] {
  return entries.slice();
}

export function addFeedback(entry: FeedbackEntry): void {
  entries.unshift(entry);
}

export function resetFeedback(): void {
  entries.length = 0;
}
```

**Step 4: Run test to verify it passes**

```bash
npm --workspace server test -- feedback-data
```

Expected: PASS, 3/3.

**Step 5: Commit**

```bash
git add server/src/data/feedback.ts server/tests/feedback-data.spec.ts
git commit -m "feat(server): in-memory feedback data store"
```

---

## Task 2: Backend — validator

**Files:**
- Create: `server/src/validators/feedback.ts`
- Create: `server/tests/feedback-validator.spec.ts`

**Step 1: Write the failing tests**

```ts
// server/tests/feedback-validator.spec.ts
import { describe, expect, it } from 'vitest';
import { validateCreateFeedback } from '../src/validators/feedback.js';

describe('validateCreateFeedback', () => {
  it('accepts a minimal valid input (no name)', () => {
    const r = validateCreateFeedback({ type: 'question', message: 'Hello' });
    expect(r).toEqual({ ok: true, value: { name: null, type: 'question', message: 'Hello' } });
  });

  it('trims message and name', () => {
    const r = validateCreateFeedback({ name: '  Ada  ', type: 'comment', message: '  yo  ' });
    expect(r).toEqual({ ok: true, value: { name: 'Ada', type: 'comment', message: 'yo' } });
  });

  it('treats whitespace-only name as null', () => {
    const r = validateCreateFeedback({ name: '   ', type: 'suggestion', message: 'm' });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.name).toBeNull();
  });

  it('rejects missing message', () => {
    const r = validateCreateFeedback({ type: 'question', message: '' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.message).toBeDefined();
  });

  it('rejects whitespace-only message', () => {
    const r = validateCreateFeedback({ type: 'question', message: '    ' });
    expect(r.ok).toBe(false);
  });

  it('rejects message > 500 chars after trim', () => {
    const r = validateCreateFeedback({ type: 'question', message: 'a'.repeat(501) });
    expect(r.ok).toBe(false);
  });

  it('rejects unknown type', () => {
    const r = validateCreateFeedback({ type: 'rant', message: 'x' } as unknown as { type: 'question'; message: string });
    expect(r.ok).toBe(false);
  });

  it('rejects name > 50 chars after trim', () => {
    const r = validateCreateFeedback({ name: 'a'.repeat(51), type: 'question', message: 'x' });
    expect(r.ok).toBe(false);
  });

  it('rejects non-object input', () => {
    const r = validateCreateFeedback(null);
    expect(r.ok).toBe(false);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace server test -- feedback-validator
```

Expected: FAIL — module not found.

**Step 3: Write minimal implementation**

```ts
// server/src/validators/feedback.ts
import type { FeedbackType } from '../data/feedback.js';

export interface CreateFeedbackValue {
  name: string | null;
  type: FeedbackType;
  message: string;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, string> };

const TYPES: readonly FeedbackType[] = ['question', 'comment', 'suggestion'];

export function validateCreateFeedback(input: unknown): ValidationResult<CreateFeedbackValue> {
  const errors: Record<string, string> = {};

  if (input === null || typeof input !== 'object') {
    return { ok: false, errors: { body: 'Body must be an object' } };
  }
  const raw = input as Record<string, unknown>;

  let name: string | null = null;
  if (raw.name !== undefined) {
    if (typeof raw.name !== 'string') {
      errors.name = 'Name must be a string';
    } else {
      const trimmed = raw.name.trim();
      if (trimmed.length > 50) errors.name = 'Name must be at most 50 characters';
      else name = trimmed.length === 0 ? null : trimmed;
    }
  }

  let type: FeedbackType | undefined;
  if (typeof raw.type !== 'string' || !TYPES.includes(raw.type as FeedbackType)) {
    errors.type = `Type must be one of ${TYPES.join(', ')}`;
  } else {
    type = raw.type as FeedbackType;
  }

  let message = '';
  if (typeof raw.message !== 'string') {
    errors.message = 'Message is required';
  } else {
    const trimmed = raw.message.trim();
    if (trimmed.length === 0) errors.message = 'Message is required';
    else if (trimmed.length > 500) errors.message = 'Message must be at most 500 characters';
    else message = trimmed;
  }

  if (Object.keys(errors).length > 0 || type === undefined) {
    return { ok: false, errors };
  }
  return { ok: true, value: { name, type, message } };
}
```

**Step 4: Run test to verify it passes**

```bash
npm --workspace server test -- feedback-validator
```

Expected: PASS, 9/9.

**Step 5: Commit**

```bash
git add server/src/validators/feedback.ts server/tests/feedback-validator.spec.ts
git commit -m "feat(server): feedback create-input validator"
```

---

## Task 3: Backend — service

**Files:**
- Create: `server/src/services/feedback.ts`
- Create: `server/tests/feedback-service.spec.ts`

**Step 1: Write the failing tests**

```ts
// server/tests/feedback-service.spec.ts
import { describe, expect, it, beforeEach } from 'vitest';
import { listFeedbackEntries, createFeedbackEntry } from '../src/services/feedback.js';
import { resetFeedback } from '../src/data/feedback.js';

describe('feedback service', () => {
  beforeEach(() => resetFeedback());

  it('createFeedbackEntry persists a normalized entry and returns it', () => {
    const entry = createFeedbackEntry({ name: 'Ada', type: 'question', message: 'Hi' });
    expect(entry.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(entry.name).toBe('Ada');
    expect(entry.type).toBe('question');
    expect(entry.message).toBe('Hi');
    expect(typeof entry.createdAt).toBe('string');
    expect(new Date(entry.createdAt).toString()).not.toBe('Invalid Date');
  });

  it('listFeedbackEntries returns entries newest first', () => {
    createFeedbackEntry({ name: null, type: 'question', message: 'first' });
    createFeedbackEntry({ name: null, type: 'comment', message: 'second' });
    expect(listFeedbackEntries().map((e) => e.message)).toEqual(['second', 'first']);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace server test -- feedback-service
```

Expected: FAIL — module not found.

**Step 3: Write minimal implementation**

```ts
// server/src/services/feedback.ts
import { randomUUID } from 'node:crypto';
import { addFeedback, listFeedback, type FeedbackEntry } from '../data/feedback.js';
import type { CreateFeedbackValue } from '../validators/feedback.js';

export function listFeedbackEntries(): FeedbackEntry[] {
  return listFeedback();
}

export function createFeedbackEntry(input: CreateFeedbackValue): FeedbackEntry {
  const entry: FeedbackEntry = {
    id: randomUUID(),
    name: input.name,
    type: input.type,
    message: input.message,
    createdAt: new Date().toISOString(),
  };
  addFeedback(entry);
  return entry;
}
```

**Step 4: Run test to verify it passes**

```bash
npm --workspace server test -- feedback-service
```

Expected: PASS, 2/2.

**Step 5: Commit**

```bash
git add server/src/services/feedback.ts server/tests/feedback-service.spec.ts
git commit -m "feat(server): feedback service (list + create)"
```

---

## Task 4: Backend — router and app wiring

**Files:**
- Create: `server/src/routes/feedback.ts`
- Modify: `server/src/routes/index.ts`
- Modify: `server/src/app.ts`
- Create: `server/tests/feedback-route.spec.ts`

**Step 1: Write the failing tests**

```ts
// server/tests/feedback-route.spec.ts
import { describe, expect, it, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { resetFeedback } from '../src/data/feedback.js';

describe('feedback routes', () => {
  beforeEach(() => resetFeedback());

  it('GET /api/feedback returns an empty list initially', async () => {
    const res = await request(createApp()).get('/api/feedback');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ entries: [] });
  });

  it('POST /api/feedback creates an entry and GET returns it newest-first', async () => {
    const app = createApp();
    const post = await request(app)
      .post('/api/feedback')
      .send({ name: 'Ada', type: 'question', message: 'Hi' })
      .set('Content-Type', 'application/json');
    expect(post.status).toBe(201);
    expect(post.body.entry).toMatchObject({ name: 'Ada', type: 'question', message: 'Hi' });
    expect(typeof post.body.entry.id).toBe('string');

    const get = await request(app).get('/api/feedback');
    expect(get.body.entries).toHaveLength(1);
    expect(get.body.entries[0].id).toBe(post.body.entry.id);
  });

  it('POST /api/feedback returns 400 with the standard error shape on invalid input', async () => {
    const res = await request(createApp())
      .post('/api/feedback')
      .send({ type: 'rant', message: '' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('Validation failed');
    expect(res.body.error.details).toBeDefined();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace server test -- feedback-route
```

Expected: FAIL — route returns 404.

**Step 3: Write minimal implementation**

```ts
// server/src/routes/feedback.ts
import { Router } from 'express';
import { validateCreateFeedback } from '../validators/feedback.js';
import { createFeedbackEntry, listFeedbackEntries } from '../services/feedback.js';

export const feedbackRouter = Router();

feedbackRouter.get('/', (_req, res) => {
  res.status(200).json({ entries: listFeedbackEntries() });
});

feedbackRouter.post('/', (req, res) => {
  const result = validateCreateFeedback(req.body);
  if (!result.ok) {
    res.status(400).json({ error: { message: 'Validation failed', details: result.errors } });
    return;
  }
  const entry = createFeedbackEntry(result.value);
  res.status(201).json({ entry });
});
```

```ts
// server/src/routes/index.ts
export { healthRouter } from './health.js';
export { feedbackRouter } from './feedback.js';
```

In `server/src/app.ts`, add the import and mount **before** the 404 handler:

```ts
import { healthRouter, feedbackRouter } from './routes/index.js';
// ...
app.use('/api/health', healthRouter);
app.use('/api/feedback', feedbackRouter);
```

**Step 4: Run test to verify it passes**

```bash
npm --workspace server test
```

Expected: all server tests pass (health + 3 feedback specs).

**Step 5: Commit**

```bash
git add server/src/routes/feedback.ts server/src/routes/index.ts server/src/app.ts server/tests/feedback-route.spec.ts
git commit -m "feat(server): GET/POST /api/feedback"
```

---

## Task 5: Frontend — types and HTTP service

**Files:**
- Create: `apps/web/src/app/feedback/feedback.types.ts`
- Create: `apps/web/src/app/feedback/feedback.service.ts`
- Create: `apps/web/src/app/feedback/feedback.service.spec.ts`

**Step 1: Write the failing tests**

```ts
// apps/web/src/app/feedback/feedback.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FeedbackService } from './feedback.service';
import type { FeedbackEntry } from './feedback.types';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), FeedbackService],
    });
    service = TestBed.inject(FeedbackService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('list() GETs /api/feedback and returns entries', async () => {
    const fake: FeedbackEntry[] = [
      { id: '1', name: null, type: 'question', message: 'hi', createdAt: '2026-05-05T00:00:00.000Z' },
    ];
    const promise = service.list();
    const req = http.expectOne('/api/feedback');
    expect(req.request.method).toBe('GET');
    req.flush({ entries: fake });
    expect(await promise).toEqual(fake);
  });

  it('create() POSTs to /api/feedback and returns the new entry', async () => {
    const fake: FeedbackEntry = {
      id: '2', name: 'Ada', type: 'comment', message: 'yo', createdAt: '2026-05-05T00:00:01.000Z',
    };
    const promise = service.create({ name: 'Ada', type: 'comment', message: 'yo' });
    const req = http.expectOne('/api/feedback');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Ada', type: 'comment', message: 'yo' });
    req.flush({ entry: fake });
    expect(await promise).toEqual(fake);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace apps/web test
```

Expected: FAIL — module not found.

**Step 3: Write minimal implementation**

```ts
// apps/web/src/app/feedback/feedback.types.ts
export type FeedbackType = 'question' | 'comment' | 'suggestion';

export interface FeedbackEntry {
  id: string;
  name: string | null;
  type: FeedbackType;
  message: string;
  createdAt: string;
}

export interface CreateFeedbackInput {
  name?: string;
  type: FeedbackType;
  message: string;
}
```

```ts
// apps/web/src/app/feedback/feedback.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import type { CreateFeedbackInput, FeedbackEntry } from './feedback.types';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly http = inject(HttpClient);

  list(): Promise<FeedbackEntry[]> {
    return firstValueFrom(
      this.http.get<{ entries: FeedbackEntry[] }>('/api/feedback').pipe(map((r) => r.entries)),
    );
  }

  create(input: CreateFeedbackInput): Promise<FeedbackEntry> {
    return firstValueFrom(
      this.http.post<{ entry: FeedbackEntry }>('/api/feedback', input).pipe(map((r) => r.entry)),
    );
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm --workspace apps/web test
```

Expected: PASS — service spec green.

**Step 5: Commit**

```bash
git add apps/web/src/app/feedback/feedback.types.ts apps/web/src/app/feedback/feedback.service.ts apps/web/src/app/feedback/feedback.service.spec.ts
git commit -m "feat(web): feedback HTTP service + types"
```

---

## Task 6: Frontend — component skeleton, route, and back-to-slide-5

**Files:**
- Create: `apps/web/src/app/feedback/feedback.ts`
- Create: `apps/web/src/app/feedback/feedback.html`
- Create: `apps/web/src/app/feedback/feedback.scss`
- Modify: `apps/web/src/app/app.routes.ts`
- Create: `apps/web/src/app/feedback/feedback.spec.ts`

**Step 1: Write the failing test**

```ts
// apps/web/src/app/feedback/feedback.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback';

describe('FeedbackComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
      ],
    });
  });

  it('renders the title, subtitle, and back-to-slide-5 link', () => {
    const fixture = TestBed.createComponent(FeedbackComponent);
    fixture.detectChanges();
    // Drain the initial poll request so HttpTestingController is happy.
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/api/feedback').flush({ entries: [] });

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('Audience Q&A');
    expect(root.textContent).toContain('Send a question, comment, or suggestion');
    const back = root.querySelector('a[routerlink="/slides/5"], a[ng-reflect-router-link="/slides/5"]');
    expect(back).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm --workspace apps/web test
```

Expected: FAIL — `FeedbackComponent` not found.

**Step 3: Write minimal implementation**

```ts
// apps/web/src/app/feedback/feedback.ts
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from './feedback.service';
import type { FeedbackEntry, FeedbackType } from './feedback.types';

type FilterValue = 'all' | FeedbackType;

@Component({
  selector: 'app-feedback',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class FeedbackComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(FeedbackService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  readonly types: readonly FeedbackType[] = ['question', 'comment', 'suggestion'];
  readonly entries = signal<FeedbackEntry[]>([]);
  readonly activeFilter = signal<FilterValue>('all');
  readonly submitting = signal(false);
  readonly filtered = computed(() => {
    const f = this.activeFilter();
    const all = this.entries();
    return f === 'all' ? all : all.filter((e) => e.type === f);
  });

  readonly form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.maxLength(50)] }),
    type: this.fb.control<FeedbackType>('question', { nonNullable: true, validators: [Validators.required] }),
    message: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
  });

  get nameLength(): number {
    return this.form.controls.name.value?.length ?? 0;
  }
  get messageLength(): number {
    return this.form.controls.message.value.length;
  }

  ngOnInit(): void {
    this.refresh();
    const id = setInterval(() => this.refresh(), 2000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  setFilter(value: FilterValue): void {
    this.activeFilter.set(value);
  }

  async submit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    const raw = this.form.getRawValue();
    const payload = {
      ...(raw.name && raw.name.trim().length > 0 ? { name: raw.name } : {}),
      type: raw.type,
      message: raw.message,
    };
    try {
      const entry = await this.service.create(payload);
      this.entries.update((prev) => [entry, ...prev]);
      this.form.reset({ name: '', type: 'question', message: '' });
    } catch {
      this.snackBar.open('Could not send — try again.', 'Dismiss', { duration: 3000 });
    } finally {
      this.submitting.set(false);
    }
  }

  private async refresh(): Promise<void> {
    try {
      const list = await this.service.list();
      this.entries.set(list);
    } catch (e) {
      console.warn('feedback poll failed', e);
    }
  }
}
```

```html
<!-- apps/web/src/app/feedback/feedback.html -->
<div class="feedback-page">
  <a mat-button class="back" routerLink="/slides/5">
    <mat-icon>arrow_back</mat-icon>
    <span>Back to slide 5</span>
  </a>

  <header class="header">
    <h1>Audience Q&amp;A</h1>
    <p class="subtitle">
      Send a question, comment, or suggestion. New entries appear in the list automatically.
    </p>
  </header>

  <div class="panels">
    <mat-card class="panel">
      <h2>Share your feedback</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <mat-form-field appearance="outline">
          <mat-label>Name (optional)</mat-label>
          <input matInput formControlName="name" maxlength="50" />
          <mat-hint align="end">{{ nameLength }}/50</mat-hint>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type">
            @for (t of types; track t) {
              <mat-option [value]="t">{{ t }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message" rows="4" maxlength="500"></textarea>
          <mat-hint align="end">{{ messageLength }}/500</mat-hint>
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="form.invalid || submitting()">
          <mat-icon>send</mat-icon>
          <span>Submit</span>
        </button>
      </form>
    </mat-card>

    <mat-card class="panel">
      <h2>Recent feedback</h2>
      <mat-chip-listbox
        [value]="activeFilter()"
        (change)="setFilter($event.value)"
        aria-label="Filter feedback">
        <mat-chip-option value="all" selected>All</mat-chip-option>
        <mat-chip-option value="question">Question</mat-chip-option>
        <mat-chip-option value="comment">Comment</mat-chip-option>
        <mat-chip-option value="suggestion">Suggestion</mat-chip-option>
      </mat-chip-listbox>

      @if (filtered().length === 0) {
        <p class="empty">No feedback yet — be the first to ask!</p>
      } @else {
        <ul class="entries">
          @for (entry of filtered(); track entry.id) {
            <li class="entry">
              <div class="entry-head">
                <span class="entry-type">{{ entry.type }}</span>
                <span class="entry-name">{{ entry.name ?? 'Anonymous' }}</span>
              </div>
              <p class="entry-message">{{ entry.message }}</p>
            </li>
          }
        </ul>
      }
    </mat-card>
  </div>
</div>
```

```scss
/* apps/web/src/app/feedback/feedback.scss */
:host { display: block; padding: 24px; }
.back { margin-bottom: 12px; }
.header h1 { margin: 0 0 4px; font-size: 28px; }
.subtitle { margin: 0 0 24px; color: rgba(0, 0, 0, 0.6); }
.panels {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
}
@media (max-width: 900px) {
  .panels { grid-template-columns: 1fr; }
}
.panel { padding: 20px; }
.panel h2 { margin: 0 0 16px; font-size: 18px; }
.form { display: flex; flex-direction: column; gap: 4px; }
.form button { align-self: flex-start; }
.empty { color: rgba(0, 0, 0, 0.6); margin: 16px 0 0; }
.entries { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 12px; }
.entry { padding: 12px; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 6px; }
.entry-head { display: flex; gap: 8px; align-items: baseline; font-size: 12px; text-transform: uppercase; color: rgba(0, 0, 0, 0.6); margin-bottom: 4px; }
.entry-type { font-weight: 600; }
.entry-message { margin: 0; white-space: pre-wrap; word-break: break-word; }
```

In `apps/web/src/app/app.routes.ts`, add the route **above** the wildcard:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feedback',
    loadComponent: () => import('./feedback/feedback').then((m) => m.FeedbackComponent),
  },
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.routes').then((m) => m.SLIDE_ROUTES),
  },
  { path: '', redirectTo: '/slides/1', pathMatch: 'full' },
  { path: '**', redirectTo: '/slides/1' },
];
```

**Step 4: Run tests to verify they pass**

```bash
npm --workspace apps/web test
```

Expected: PASS — component smoke test green.

**Step 5: Commit**

```bash
git add apps/web/src/app/feedback/ apps/web/src/app/app.routes.ts
git commit -m "feat(web): /feedback page (form, list, polling, back-to-slide-5)"
```

---

## Task 7: Frontend — component behavior tests

**Files:**
- Modify: `apps/web/src/app/feedback/feedback.spec.ts`

**Step 1: Add behavior tests**

Append to `feedback.spec.ts`:

```ts
import { ComponentFixture } from '@angular/core/testing';

describe('FeedbackComponent behavior', () => {
  let fixture: ComponentFixture<FeedbackComponent>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
      ],
    });
    fixture = TestBed.createComponent(FeedbackComponent);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('/api/feedback').flush({ entries: [] });
  });

  afterEach(() => {
    // Drain any pending poll requests scheduled by setInterval.
    http.match('/api/feedback').forEach((r) => r.flush({ entries: fixture.componentInstance.entries() }));
    fixture.destroy();
  });

  it('shows the empty state when entries() is empty', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('No feedback yet — be the first to ask!');
  });

  it('renders entries when present', () => {
    fixture.componentInstance.entries.set([
      { id: '1', name: 'Ada', type: 'question', message: 'Hi', createdAt: '2026-05-05T00:00:00.000Z' },
    ]);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Hi');
    expect(text).toContain('Ada');
  });

  it('filters by type when a chip is selected', () => {
    fixture.componentInstance.entries.set([
      { id: '1', name: null, type: 'question', message: 'Q', createdAt: 'x' },
      { id: '2', name: null, type: 'comment', message: 'C', createdAt: 'y' },
    ]);
    fixture.componentInstance.setFilter('comment');
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('C');
    expect(text).not.toContain('Q');
  });

  it('disables submit while message is empty', () => {
    const button = (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fixture.componentInstance.form.controls.message.setValue('Hello');
    fixture.detectChanges();
    expect(button.disabled).toBe(false);
  });

  it('prepends the created entry on submit', async () => {
    fixture.componentInstance.form.controls.message.setValue('Hi');
    fixture.componentInstance.form.controls.name.setValue('Ada');
    const submitPromise = fixture.componentInstance.submit();
    const post = http.expectOne((r) => r.method === 'POST' && r.url === '/api/feedback');
    post.flush({
      entry: { id: 'new', name: 'Ada', type: 'question', message: 'Hi', createdAt: 'z' },
    });
    await submitPromise;
    expect(fixture.componentInstance.entries()[0].id).toBe('new');
  });
});
```

**Step 2: Run tests to verify they pass**

```bash
npm --workspace apps/web test
```

Expected: PASS — all FeedbackComponent specs green.

**Step 3: Commit**

```bash
git add apps/web/src/app/feedback/feedback.spec.ts
git commit -m "test(web): feedback component behavior coverage"
```

---

## Task 8: E2E — Playwright spec

**Files:**
- Create: `e2e/tests/feedback.spec.ts`

**Step 1: Write the spec**

```ts
// e2e/tests/feedback.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Audience Q&A', () => {
  test('shows the empty state on first visit', async ({ page }) => {
    await page.goto('/feedback');
    await expect(page.getByRole('heading', { name: 'Audience Q&A' })).toBeVisible();
    await expect(page.getByText('No feedback yet — be the first to ask!')).toBeVisible();
  });

  test('submitting adds an entry and filtering narrows the list', async ({ page }) => {
    await page.goto('/feedback');
    const unique = `e2e-${Date.now()}`;
    await page.getByLabel('Name (optional)').fill('Ada');
    await page.getByLabel('Message').fill(unique);
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(unique)).toBeVisible();

    await page.getByRole('option', { name: 'Comment' }).click();
    await expect(page.getByText(unique)).toBeHidden();

    await page.getByRole('option', { name: 'All' }).click();
    await expect(page.getByText(unique)).toBeVisible();
  });

  test('back-to-slide-5 returns to the slide deck', async ({ page }) => {
    await page.goto('/feedback');
    await page.getByRole('link', { name: /back to slide 5/i }).click();
    await expect(page).toHaveURL(/\/slides\/5$/);
  });
});
```

**Step 2: Run the spec**

Start the dev servers in another terminal (`npm run dev`), then:

```bash
npm --workspace e2e test -- feedback
```

Expected: 3/3 PASS. If they fail because chip selection uses different roles in the installed Material version, inspect the rendered DOM and update the locators (chip-option may render as `role="option"` inside `role="listbox"`).

**Step 3: Commit**

```bash
git add e2e/tests/feedback.spec.ts
git commit -m "test(e2e): /feedback empty state, submit, filter, back-link"
```

---

## Task 9: Definition-of-done sweep

**Step 1: Full test suite**

```bash
npm test
```

Expected: all unit + integration tests pass.

**Step 2: Coverage check**

```bash
npm run coverage
```

Open `server/coverage/index.html` and `apps/web/coverage/index.html`. Confirm:

- Server overall ≥ 80%.
- Web overall ≥ 70%.

If a target misses, add tests for uncovered branches in the validator or component. Do **not** weaken thresholds (CLAUDE.md hard rule).

**Step 3: Build**

```bash
npm run build
```

Expected: both workspaces build cleanly.

**Step 4: Visual regression**

The new page is outside the slides deck, so the slide-7 visual baseline is unaffected. No `--update-snapshots` run is required. Confirm:

```bash
npm run e2e
```

Expected: all e2e specs green, including the three new feedback ones and the existing visual baseline.

**Step 5: Update docs**

Append a short bullet to `README.md` under whatever feature/route list it has, mentioning `/feedback`. No new commands were added, so the command table is unchanged. `CLAUDE.md` rules cover this feature already — no update needed unless a new lesson surfaced.

**Step 6: Final commit (if README touched)**

```bash
git add README.md
git commit -m "docs: mention /feedback page"
```

---

## Risks and watchpoints during execution

- **Zoneless change detection.** This app uses `provideZonelessChangeDetection`. Signal updates inside async callbacks (`submit`, `refresh`) propagate fine, but if a future change adds a non-signal field that updates from a `setInterval`, it won't re-render. Stick to signals for state.
- **HttpTestingController + setInterval.** The component schedules a 2s poll on `ngOnInit`. Tests must drain the initial request and any pending requests in `afterEach`. The provided test scaffolding does this.
- **Chip selection in Playwright.** Material chip rendering changes between versions. If `getByRole('option', ...)` doesn't match, fall back to `getByText('Comment').click()`.
- **Render auto-deploys from `demo-finished`.** This work lives on `main` (or a feature branch). Do not push to `demo-finished` until the full preshow check (`npm run preshow`) passes.
