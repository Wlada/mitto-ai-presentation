import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-07-live-flow',
  standalone: true,
  template: `
    <section class="slide">
      <h1>The live workflow: analyze → plan → dispatch</h1>
      <p class="lead">
        Five steps. Each one a separate skill. The developer reviews between every step.
      </p>
      <ol>
        <li><strong>Analyze</strong> — brainstorm requirements with the agent</li>
        <li><strong>Plan</strong> — write the implementation plan to <code>docs/plans/</code></li>
        <li><strong>Dispatch</strong> — split the plan into parallel subagent tasks</li>
        <li><strong>Run</strong> — subagents work in parallel, each in its own context</li>
        <li><strong>Review</strong> — independent code-reviewer subagent checks the diff</li>
      </ol>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .slide { max-width: 800px; }
      h1 { font-size: 36px; line-height: 1.2; margin: 0 0 24px; font-weight: 700; }
      .lead { font-size: 18px; color: var(--mitto-muted); margin: 0 0 32px; line-height: 1.5; }
      ol { font-size: 17px; line-height: 1.8; padding-left: 1.5rem; margin: 0; }
      li { margin-bottom: 12px; }
      strong { color: var(--mitto-fg); font-weight: 600; }
    `,
  ],
})
export class Slide07LiveFlow {}
