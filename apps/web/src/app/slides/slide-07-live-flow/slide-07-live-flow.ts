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
      ol { padding-left: 1.5rem; }
      li { margin-bottom: 12px; }
      strong { color: var(--mitto-fg); font-weight: 600; }
    `,
  ],
})
export class Slide07LiveFlow {}
