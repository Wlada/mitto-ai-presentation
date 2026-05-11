import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-limits',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Where it can go wrong</h1>
      <ul>
        <li>Wrong guesses it never tells you about</li>
        <li>Changes bigger than the task asked for</li>
        <li>Tests that pass but don't really check anything</li>
        <li>Sounds confident even when it's wrong</li>
        <li>"Helpful" cleanups that break other things</li>
      </ul>
      <p class="closing">
        Stay safe with: <strong>small scope, plan first, every diff reviewed.</strong>
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
