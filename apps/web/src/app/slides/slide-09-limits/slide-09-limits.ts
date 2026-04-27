import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-09-limits',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Limits and risks</h1>
      <p class="lead">
        Honest about where it falls short — these are the cases where humans must drive.
      </p>
      <ul>
        <li>Architectural decisions and trade-offs — humans only</li>
        <li>Subtle business logic without a clear spec</li>
        <li>Long-lived production debugging across many services</li>
        <li>Anything where the cost of a wrong answer is high</li>
        <li>Unbounded scope creep without a written plan</li>
      </ul>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .slide { max-width: 800px; }
      h1 { font-size: 36px; line-height: 1.2; margin: 0 0 24px; font-weight: 700; }
      .lead { font-size: 18px; color: var(--mitto-muted); margin: 0 0 32px; line-height: 1.5; }
      ul { font-size: 17px; line-height: 1.8; padding-left: 1.25rem; margin: 0; }
      li { margin-bottom: 8px; }
    `,
  ],
})
export class Slide09Limits {}
