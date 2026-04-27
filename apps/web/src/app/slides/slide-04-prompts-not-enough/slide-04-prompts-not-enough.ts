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
  styles: [':host { display: block; }'],
})
export class Slide04PromptsNotEnough {}
