import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-limits',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Where it can go wrong</h1>
      <ul>
        <li>Silent wrong guesses</li>
        <li>Doing more than asked</li>
        <li>Tests that pass but don't really test</li>
        <li>Sounds sure even when it is wrong</li>
        <li>Cleanups that break other things</li>
      </ul>
      <p class="closing">
        Stay safe: <strong>small tasks, plan first, review every change.</strong>
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
export class Slide08Limits {}
