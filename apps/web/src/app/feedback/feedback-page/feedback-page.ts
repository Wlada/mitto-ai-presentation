import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { FeedbackForm } from '../feedback-form/feedback-form';
import { FeedbackList } from '../feedback-list/feedback-list';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeedbackForm, FeedbackList, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <section class="page">
      <header class="page-header">
        <a mat-stroked-button routerLink="/slides/1" class="back">
          <mat-icon>arrow_back</mat-icon>
          <span>Back to slides</span>
        </a>
        <h1>
          <span class="title-text">Audience Q&amp;A</span>
          <span class="title-underline" aria-hidden="true"></span>
        </h1>
        <p class="subtitle">
          Send a question, comment, or suggestion. New entries appear in the list automatically.
        </p>
      </header>

      <div class="grid">
        <app-feedback-form />
        <app-feedback-list />
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background:
          linear-gradient(to bottom, var(--mitto-surface), var(--mitto-bg) 160px),
          var(--mitto-bg);
      }
      .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 24px 64px;
      }
      .page-header {
        margin-bottom: 32px;
      }
      .back {
        margin-bottom: 16px;
        color: var(--mitto-fg);
        border-radius: 999px;
      }
      .back mat-icon {
        margin-right: 4px;
      }
      h1 {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 0 8px;
        font-size: 28px;
        font-weight: 700;
        color: var(--mitto-fg);
        line-height: 1.2;
      }
      .title-underline {
        display: block;
        width: 48px;
        height: 4px;
        margin-top: 8px;
        background: var(--mitto-accent);
        border-radius: 2px;
      }
      .subtitle {
        margin: 0;
        color: var(--mitto-muted);
        font-size: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 900px) {
        .grid {
          grid-template-columns: minmax(320px, 420px) 1fr;
          align-items: start;
        }
      }
    `,
  ],
})
export class FeedbackPage {}
