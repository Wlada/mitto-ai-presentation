import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { FeedbackForm } from '../feedback-form/feedback-form';
import { FeedbackList } from '../feedback-list/feedback-list';
import { SlideService } from '../../slides/slide.service';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeedbackForm, FeedbackList, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <section class="page">
      <a
        mat-icon-button
        [routerLink]="['/slides', slides.currentNumber()]"
        class="back"
        [attr.aria-label]="'Back to slide ' + slides.currentNumber()"
        [title]="'Back to slide ' + slides.currentNumber()"
      >
        <mat-icon>arrow_back</mat-icon>
      </a>

      <header class="page-header">
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
          linear-gradient(to bottom, var(--mitto-surface), var(--mitto-bg) 200px),
          var(--mitto-bg);
      }
      .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px 24px 64px;
        position: relative;
      }
      .back {
        color: var(--mitto-fg);
        background: var(--mitto-bg);
        border: 1px solid var(--mitto-divider);
        transition:
          color 160ms ease,
          border-color 160ms ease,
          background 160ms ease;
      }
      .back:hover {
        color: var(--mitto-accent);
        border-color: var(--mitto-accent);
      }
      .page-header {
        margin: 28px 0 40px;
      }
      h1 {
        margin: 0 0 12px;
        font-size: 32px;
        font-weight: 700;
        color: var(--mitto-fg);
        line-height: 1.2;
        letter-spacing: -0.01em;
      }
      .title-text {
        display: block;
      }
      .title-underline {
        display: block;
        width: 56px;
        height: 4px;
        margin-top: 12px;
        background: var(--mitto-accent);
        border-radius: 2px;
      }
      .subtitle {
        margin: 0;
        color: var(--mitto-muted);
        font-size: 15px;
        max-width: 60ch;
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
export class FeedbackPage {
  protected readonly slides = inject(SlideService);
}
