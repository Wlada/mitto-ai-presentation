import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-09-what-works',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Where agents earn their keep</h1>
      <ul>
        <li>Scaffolding new features along existing patterns</li>
        <li>Writing tests for predictable code paths</li>
        <li>Wiring components, routes, services</li>
        <li>Refactoring repetitive structures</li>
        <li>Exploring unfamiliar code (read-only)</li>
      </ul>
      <p class="closing">
        The pattern: <strong>bounded, well-shaped problems.</strong>
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .closing {
        margin: 32px 0 0;
        font-size: 18px;
        line-height: 1.6;
        color: var(--mitto-fg);
        font-style: normal;
      }
    `,
  ],
})
export class Slide09WhatWorks {}
