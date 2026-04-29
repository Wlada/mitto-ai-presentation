import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-03-prompts-not-enough',
  standalone: true,
  template: `
    <section class="slide">
      <h1>The problem with "just prompt it"</h1>
      <ul>
        <li>Without project context, the agent guesses.</li>
        <li>Without a workflow, it skips review steps.</li>
        <li>Without rules, it adds dependencies you don't want.</li>
      </ul>
      <h2>The fix</h2>
      <ul class="fix">
        <li><code>CLAUDE.md</code> &rarr; permanent project rules</li>
        <li><strong>Skills</strong> &rarr; reusable workflows</li>
        <li><strong>Subagents</strong> &rarr; parallel, specialized work</li>
      </ul>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      h2 {
        font-size: 18px;
        margin: 32px 0 12px;
      }
    `,
  ],
})
export class Slide03PromptsNotEnough {}
