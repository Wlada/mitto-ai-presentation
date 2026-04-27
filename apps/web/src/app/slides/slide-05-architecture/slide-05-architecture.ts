import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-05-architecture',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Demo application architecture</h1>
      <p class="lead">
        The slides you're watching live in the same repo the agent will modify. One Angular app,
        one Express server, one CLAUDE.md.
      </p>
      <pre>mitto-ai-presentation/
├── apps/web/
├── server/
├── e2e/
├── docs/
└── CLAUDE.md</pre>
      <ul>
        <li>Frontend: Angular 21 + Material, signals, zoneless</li>
        <li>Backend: Node + Express + TypeScript, in-memory storage</li>
        <li>Tests: Vitest (unit + integration), Playwright (e2e), Supertest (HTTP)</li>
      </ul>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .slide { max-width: 800px; }
      h1 { font-size: 36px; line-height: 1.2; margin: 0 0 24px; font-weight: 700; }
      .lead { font-size: 18px; color: var(--mitto-muted); margin: 0 0 24px; line-height: 1.5; }
      pre {
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 24px;
        padding: 16px 20px;
        background: var(--mitto-surface);
        border: 1px solid var(--mitto-divider);
        border-radius: 6px;
      }
      ul { font-size: 17px; line-height: 1.8; padding-left: 1.25rem; margin: 0; }
      li { margin-bottom: 6px; }
    `,
  ],
})
export class Slide05Architecture {}
