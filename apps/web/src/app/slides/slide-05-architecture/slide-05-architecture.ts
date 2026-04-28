import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-05-architecture',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Today's demo app</h1>
      <pre>apps/web/      Angular 21 + Material
server/        Node + Express + TypeScript
e2e/           Playwright
docs/          Plans, prompts, cheatsheet
CLAUDE.md      The project context file</pre>
      <ul>
        <li>Frontend: Angular 21 + Material</li>
        <li>Backend: Node + Express + TypeScript</li>
        <li>End-to-end tests: Playwright</li>
        <li>Docs: plans, prompts, cheatsheet</li>
        <li><code>CLAUDE.md</code>: the project context file</li>
      </ul>
      <p class="closing">
        The slides you see right now are rendered by this same app.
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      pre {
        font-size: 14px;
        margin: 0 0 24px;
        padding: 16px 20px;
        border-radius: 6px;
      }
      li { margin-bottom: 6px; }
      .closing {
        margin: 24px 0 0;
        font-size: 18px;
        line-height: 1.5;
        color: var(--mitto-fg);
        font-style: normal;
      }
    `,
  ],
})
export class Slide05Architecture {}
