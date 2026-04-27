import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-what-works',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What agents do well</h1>
      <p class="lead">
        Where the cost-benefit is clearly positive — repeatable, well-scoped engineering work.
      </p>
      <ul>
        <li>CRUD endpoints, validators, and matching tests</li>
        <li>Form components with consistent shape across pages</li>
        <li>Refactors that follow a clear mechanical rule</li>
        <li>Test scaffolding and fixture setup</li>
        <li>Documentation that mirrors the code</li>
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
export class Slide08WhatWorks {}
