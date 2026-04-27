import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-02-why-agents',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Why AI coding agents in our workflow</h1>
      <p class="lead">
        Agents shorten the path from idea to working, tested code — without removing the developer
        from the loop.
      </p>
      <ul>
        <li>Faster iteration on routine, well-scoped tasks</li>
        <li>Consistency in plan, code shape, and tests</li>
        <li>Frees engineers to focus on design and judgement</li>
      </ul>
    </section>
  `,
  styles: [':host { display: block; }'],
})
export class Slide02WhyAgents {}
