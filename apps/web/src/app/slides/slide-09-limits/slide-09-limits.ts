import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-09-limits',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Where it can go wrong</h1>
      <ul>
        <li>Wrong assumptions made silently</li>
        <li>Diff bigger than the task warranted</li>
        <li>Tests that pass but don't actually verify</li>
        <li>Confidence that exceeds correctness</li>
        <li>"Helpful" refactors that break things</li>
      </ul>
      <p class="closing">
        Mitigation: <strong>small scope, plan-first, mandatory review.</strong>
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .closing {
        margin-top: 32px;
        font-size: 18px;
        line-height: 1.6;
        color: var(--mitto-fg);
      }
    `,
  ],
})
export class Slide09Limits {}
