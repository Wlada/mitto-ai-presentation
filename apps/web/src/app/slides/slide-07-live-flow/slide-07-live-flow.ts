import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-07-live-flow',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What the agent will do</h1>
      <ol>
        <li><strong>Brainstorm the feature</strong> &mdash; asks me questions</li>
        <li><strong>Write the plan</strong> &mdash; commits to a doc</li>
        <li><strong>Dispatch subagents</strong> &mdash; parallel work</li>
        <li><strong>Run tests</strong> &mdash; verifies its own output</li>
        <li><strong>Summarize</strong> &mdash; reports what changed</li>
      </ol>
      <p class="closing">
        You'll see steps 1&ndash;3 live.<br />
        Steps 4&ndash;5 take longer; we'll jump to a finished result.
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      ol { padding-left: 1.5rem; }
      li { margin-bottom: 12px; }
      strong { color: var(--mitto-fg); font-weight: 600; }
      .closing {
        margin-top: 32px;
        font-size: 18px;
        line-height: 1.6;
        color: var(--mitto-fg);
      }
    `,
  ],
})
export class Slide07LiveFlow {}
