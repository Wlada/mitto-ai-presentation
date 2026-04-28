import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, interval, merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { FeedbackService } from '../feedback.service';
import { FEEDBACK_TYPES, FeedbackEntry, FeedbackType } from '../feedback.types';
import { relativeTime } from '../relative-time';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="list-wrap">
      <div class="header">
        <h2 class="list-title">
          <mat-icon class="title-icon" aria-hidden="true">forum</mat-icon>
          <span>Recent feedback</span>
        </h2>
        @if (loading()) {
          <mat-spinner diameter="18" />
        }
      </div>

      <div class="filters" role="group" aria-label="Filter feedback by type">
        <button
          type="button"
          class="filter-pill"
          [class.active]="filter() === null"
          [attr.aria-pressed]="filter() === null"
          (click)="onFilter(null)"
        >
          All
        </button>
        @for (t of types; track t) {
          <button
            type="button"
            class="filter-pill"
            [class.active]="filter() === t"
            [attr.aria-pressed]="filter() === t"
            (click)="onFilter(t)"
          >
            {{ t }}
          </button>
        }
      </div>

      @if (error(); as err) {
        <p class="error">{{ err }}</p>
      }

      @if (!loading() && entries().length === 0) {
        <div class="empty">
          <mat-icon class="empty-icon" aria-hidden="true">question_answer</mat-icon>
          <p class="empty-text">No feedback yet — be the first to ask!</p>
        </div>
      }

      <div class="entries">
        @for (entry of entries(); track entry.id) {
          <mat-card appearance="outlined" class="entry" [attr.data-type]="entry.type">
            <div class="entry-head">
              <span class="who" [class.anon]="!entry.name?.trim()">{{
                displayName(entry.name)
              }}</span>
              <span class="badge" [attr.data-type]="entry.type">{{ entry.type }}</span>
              <span class="time">{{ relativeTime(entry.createdAt) }}</span>
            </div>
            <p class="message">{{ entry.message }}</p>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .list-wrap {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .list-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--mitto-fg);
      }
      .title-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: var(--mitto-accent);
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 4px;
        background: var(--mitto-bg);
        border: 1px solid var(--mitto-divider);
        border-radius: 999px;
        align-self: flex-start;
      }
      .filter-pill {
        appearance: none;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        line-height: 1;
        padding: 7px 14px;
        border: none;
        border-radius: 999px;
        background: transparent;
        color: var(--mitto-muted);
        text-transform: capitalize;
        cursor: pointer;
        transition:
          color 140ms ease,
          background 140ms ease,
          box-shadow 140ms ease;
      }
      .filter-pill:hover:not(.active) {
        color: var(--mitto-fg);
        background: var(--mitto-surface);
      }
      .filter-pill:focus-visible {
        outline: 2px solid var(--mitto-accent);
        outline-offset: 2px;
      }
      .filter-pill.active {
        background: var(--mitto-accent);
        color: #ffffff;
        box-shadow: 0 1px 2px rgba(252, 0, 121, 0.2);
      }

      .entries {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .entry {
        border: 1px solid var(--mitto-divider);
        background: var(--mitto-bg);
        padding: 16px;
        box-shadow:
          0 1px 2px rgba(31, 0, 71, 0.04),
          0 4px 12px rgba(31, 0, 71, 0.04) !important;
        transition:
          transform 160ms ease,
          box-shadow 160ms ease;
      }
      .entry:hover {
        transform: translateY(-1px);
        box-shadow:
          0 2px 4px rgba(31, 0, 71, 0.06),
          0 8px 20px rgba(31, 0, 71, 0.06) !important;
      }
      .entry-head {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      .who {
        font-weight: 600;
        color: var(--mitto-fg);
        font-size: 14px;
      }
      .who.anon {
        font-weight: 500;
        font-style: italic;
        color: var(--mitto-muted);
      }
      .time {
        margin-left: auto;
        font-size: 12px;
        color: var(--mitto-muted);
      }
      .badge {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--mitto-surface);
        color: var(--mitto-muted);
      }
      .badge[data-type='question'] {
        background: rgba(252, 0, 121, 0.1);
        color: var(--mitto-accent);
      }
      .badge[data-type='comment'] {
        background: var(--mitto-surface);
        color: var(--mitto-fg-soft);
      }
      .badge[data-type='suggestion'] {
        background: rgba(46, 125, 50, 0.12);
        color: #2e7d32;
      }
      .message {
        margin: 0;
        font-size: 14px;
        line-height: 1.55;
        color: var(--mitto-fg);
        white-space: pre-wrap;
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin: 24px 0;
        color: var(--mitto-muted);
      }
      .empty-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: var(--mitto-divider);
      }
      .empty-text {
        margin: 0;
        font-style: italic;
        font-size: 14px;
      }
      .error {
        margin: 0;
        color: #b00020;
        font-size: 13px;
      }
    `,
  ],
})
export class FeedbackList {
  private readonly service = inject(FeedbackService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refresh$ = new Subject<void>();

  protected readonly types = FEEDBACK_TYPES;
  protected readonly entries = signal<FeedbackEntry[]>([]);
  protected readonly loading = signal(false);
  protected readonly filter = signal<FeedbackType | null>(null);
  protected readonly error = signal<string | null>(null);

  protected readonly displayName = (name?: string) => name?.trim() || 'Anonymous';
  protected readonly relativeTime = relativeTime;

  constructor() {
    // Background poll + filter-triggered refresh share one switchMap, so an
    // older in-flight response can never overwrite a newer one.
    merge(interval(3000).pipe(startWith(0)), this.refresh$)
      .pipe(
        switchMap(() => {
          this.error.set(null);
          return this.service.list(this.filter() ?? undefined);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (data) => {
          // Skip the signal write when ids and length match — keeps the
          // template stable so background polls don't re-render every 3s.
          if (!sameEntries(this.entries(), data)) {
            this.entries.set(data);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Could not load feedback.');
        },
      });
  }

  protected onFilter(value: FeedbackType | null): void {
    this.filter.set(value);
    this.loading.set(true);
    this.refresh$.next();
  }
}

function sameEntries(a: readonly FeedbackEntry[], b: readonly FeedbackEntry[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
  }
  return true;
}
