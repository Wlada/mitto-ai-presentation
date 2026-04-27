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
      <h1>Today's demo task: Audience Q&amp;A</h1>
      <p class="lead">
        A small but realistic feature — the agent will produce both halves and the safety net.
      </p>
      <h2>What the agent will deliver</h2>
      <ul>
        <li>Frontend: submit form and live list page (Angular Material)</li>
        <li>Backend: <code>POST /api/feedback</code> and <code>GET /api/feedback</code> with validation</li>
        <li>Tests: unit, integration (Supertest), one Playwright e2e</li>
      </ul>
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
      h1 { margin: 0 0 16px; }
      h2 { font-size: 18px; font-weight: 600; margin: 24px 0 12px; color: var(--mitto-fg); }
      .lead { margin: 0 0 16px; }
      .cta { margin-top: 24px; }
      .cta mat-icon { margin-right: 6px; }
    `,
  ],
})
export class Slide06DemoTask {}
