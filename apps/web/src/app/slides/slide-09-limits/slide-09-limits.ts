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
  styles: [':host { display: block; }'],
})
export class Slide09Limits {}
