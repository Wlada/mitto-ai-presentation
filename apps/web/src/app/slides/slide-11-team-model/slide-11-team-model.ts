import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-11-team-model',
  standalone: true,
  template: `
    <section class="slide">
      <h1>How a team should use this</h1>
      <ul class="pairs">
        <li><span class="agent">Agent makes the plan</span> &rarr; <span class="human">Human approves</span></li>
        <li><span class="agent">Agent makes small diffs</span> &rarr; <span class="human">Human reviews each</span></li>
        <li><span class="agent">Tests are mandatory</span> &rarr; <span class="human">CI gates on coverage</span></li>
        <li><span class="agent">No autonomous merging</span> &rarr; <span class="human">Always a human PR</span></li>
        <li><span class="agent"><code>CLAUDE.md</code> owned by team</span> &rarr; <span class="human">Living document</span></li>
      </ul>
      <p class="takeaway">
        Treat the agent as a fast junior.<br />
        Treat yourself as the senior.
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .pairs .agent { color: var(--mitto-fg); font-weight: 600; }
      .pairs .human { color: var(--mitto-muted); }
      .takeaway {
        margin: 32px 0 0;
        padding: 0 0 0 16px;
        font-size: 20px;
        line-height: 1.5;
        color: var(--mitto-fg);
        background: transparent;
        border-left: 3px solid var(--mitto-accent);
        border-radius: 0;
      }
    `,
  ],
})
export class Slide11TeamModel {}
