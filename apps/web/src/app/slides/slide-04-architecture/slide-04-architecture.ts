import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-04-architecture',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Today's demo app</h1>
      <p class="quote">"Add an Audience Q&amp;A feature."</p>
      <ul>
        <li>Frontend: Angular 21 + Material</li>
        <li>Backend: Node + Express + TypeScript</li>
        <li>End-to-end tests: Playwright</li>
        <li>Docs: plans, prompts, cheatsheet</li>
        <li><code>CLAUDE.md</code>: the project context file</li>
      </ul>
      <pre>apps/web/      Angular 21 + Material
server/        Node + Express + TypeScript
e2e/           Playwright
docs/          Plans, prompts, cheatsheet
CLAUDE.md      The project context file</pre>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .quote {
        font-size: 22px;
        margin: 0 0 24px;
        padding-left: 16px;
        border-left: 3px solid var(--mitto-accent);
        line-height: 1.4;
      }
      pre {
        font-size: 14px;
        margin: 24px 0 0;
        padding: 16px 20px;
        border-radius: 6px;
      }
      li { margin-bottom: 6px; }
    `,
  ],
})
export class Slide04Architecture {}
