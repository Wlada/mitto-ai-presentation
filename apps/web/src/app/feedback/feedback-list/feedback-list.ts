import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, interval, merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { FeedbackService } from '../feedback.service';
import { FEEDBACK_TYPES, FeedbackEntry, FeedbackType } from '../feedback.types';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatChipsModule, MatProgressSpinnerModule],
  template: `
    <div class="list-wrap">
      <div class="header">
        <h2 class="list-title">Recent feedback</h2>
        @if (loading()) {
          <mat-spinner diameter="18" />
        }
      </div>

      <mat-chip-listbox
        class="filters"
        [value]="filter()"
        (change)="onFilter($event.value)"
        aria-label="Filter feedback by type"
      >
        <mat-chip-option [value]="null" [selected]="filter() === null">All</mat-chip-option>
        @for (t of types; track t) {
          <mat-chip-option [value]="t" [selected]="filter() === t">{{ t }}</mat-chip-option>
        }
      </mat-chip-listbox>

      @if (error(); as err) {
        <p class="error">{{ err }}</p>
      }

      @if (!loading() && entries().length === 0) {
        <p class="empty">No feedback yet — be the first to ask!</p>
      }

      <div class="entries">
        @for (entry of entries(); track entry.id) {
          <mat-card appearance="outlined" class="entry">
            <div class="entry-head">
              <span class="who">{{ displayName(entry.name) }}</span>
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
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--mitto-fg);
      }
      .filters {
        display: flex;
        flex-wrap: wrap;
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
        box-shadow: none !important;
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
        background: rgba(31, 58, 138, 0.1);
        color: var(--mitto-accent);
      }
      .badge[data-type='comment'] {
        background: var(--mitto-surface);
        color: var(--mitto-muted);
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
        margin: 16px 0;
        color: var(--mitto-muted);
        font-style: italic;
      }
      .error {
        margin: 0;
        color: #b00020;
        font-size: 13px;
      }
    `,
  ],
})
export class FeedbackList implements OnInit {
  private readonly service = inject(FeedbackService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refresh$ = new Subject<void>();

  protected readonly types = FEEDBACK_TYPES;
  protected readonly entries = signal<FeedbackEntry[]>([]);
  protected readonly loading = signal(false);
  protected readonly filter = signal<FeedbackType | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    // Background poll + filter-triggered refresh share one switchMap, so an
    // older in-flight response can never overwrite a newer one.
    merge(interval(3000).pipe(startWith(0)), this.refresh$)
      .pipe(
        switchMap(() => {
          this.loading.set(true);
          return this.service.list(this.filter() ?? undefined);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (data) => {
          this.entries.set(data);
          this.loading.set(false);
          this.error.set(null);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Could not load feedback.');
        },
      });
  }

  protected onFilter(value: FeedbackType | null): void {
    this.filter.set(value);
    this.refresh$.next();
  }

  protected displayName(name?: string): string {
    return name?.trim() || 'Anonymous';
  }

  protected relativeTime(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) {
      return '';
    }
    const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
    if (diffSec < 5) return 'just now';
    if (diffSec < 60) return `${diffSec} seconds ago`;
    const min = Math.floor(diffSec / 60);
    if (min < 60) return `${min} minute${min === 1 ? '' : 's'} ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
    const day = Math.floor(hr / 24);
    return `${day} day${day === 1 ? '' : 's'} ago`;
  }
}
