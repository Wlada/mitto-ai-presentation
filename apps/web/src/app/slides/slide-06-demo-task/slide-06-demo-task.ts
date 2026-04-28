import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slide-06-demo-task',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <section class="slide">
      <h1>The task we'll give to the agent</h1>
      <p class="quote">"Add an Audience Q&amp;A feature."</p>
      <pre>Backend:   GET / POST /api/feedback
           validation, in-memory storage
Frontend:  /feedback page
           form, list, real-time-ish polling
Tests:     unit + integration + Playwright e2e</pre>
      <p class="cta">
        <a mat-stroked-button color="primary" routerLink="/feedback">
          <mat-icon>open_in_new</mat-icon>
          <span>Try the demo feature</span>
        </a>
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .quote {
        font-size: 22px;
        font-weight: 600;
        color: var(--mitto-fg);
        margin: 0 0 24px;
        padding-left: 16px;
        border-left: 3px solid var(--mitto-accent);
      }
      pre {
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 24px;
        padding: 16px 20px;
        background: var(--mitto-surface);
        border: 1px solid var(--mitto-divider);
        border-radius: 6px;
      }
      .cta { margin-top: 24px; }
      .cta mat-icon { margin-right: 6px; }
    `,
  ],
})
export class Slide06DemoTask {}
