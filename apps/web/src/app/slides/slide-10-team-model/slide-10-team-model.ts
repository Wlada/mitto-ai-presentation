import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-10-team-model',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Recommended team model</h1>
      <p class="lead">
        The agent is a force multiplier on a disciplined team — not a replacement for one.
      </p>
      <ul>
        <li>Developer owns the change — name, plan, review, ship</li>
        <li>Agent drafts and dispatches — never merges unattended</li>
        <li>Plans live in the repo — reviewable like code</li>
        <li>One CLAUDE.md per repo — conventions in one place</li>
        <li>CI is the source of truth — agent output passes the same gates</li>
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
export class Slide10TeamModel {}
