import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-02-why-agents',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Why we're talking about this</h1>
      <ul>
        <li>Faster understanding of unfamiliar code</li>
        <li>Faster scaffolding and boilerplate</li>
        <li>Tests written alongside code, not after</li>
        <li>Developer stays the reviewer and owner</li>
      </ul>
      <p class="closing">
        <strong>Not: replace the engineer.</strong><br />
        <strong>Yes: shorter cycle, with control.</strong>
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
export class Slide02WhyAgents {}
