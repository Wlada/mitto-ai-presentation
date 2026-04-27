import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-04-prompts-not-enough',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Why prompts alone aren't enough</h1>
      <p class="lead">
        A single chat prompt produces a snippet. A real change needs context, conventions, tests,
        and review.
      </p>
      <ul>
        <li>Prompts forget the project — agents read it every run</li>
        <li>Prompts produce code in a vacuum — agents run the tests</li>
        <li>Prompts can't dispatch parallel work — agents can</li>
        <li>Prompts have no review step — agents do</li>
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
export class Slide04PromptsNotEnough {}
