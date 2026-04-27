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
  styles: [
    `
      :host {
        display: block;
      }
      .slide {
        max-width: 800px;
      }
      h1 {
        font-size: 36px;
        line-height: 1.2;
        margin: 0 0 24px;
        font-weight: 700;
      }
      .lead {
        font-size: 18px;
        color: var(--mitto-muted);
        margin: 0 0 32px;
        line-height: 1.5;
      }
      ul {
        font-size: 17px;
        line-height: 1.8;
        padding-left: 1.25rem;
        margin: 0;
      }
      li {
        margin-bottom: 8px;
      }
    `,
  ],
})
export class Slide02WhyAgents {}
