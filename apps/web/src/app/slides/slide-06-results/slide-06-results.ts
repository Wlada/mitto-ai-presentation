import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RESULTS } from './results.data';

@Component({
  selector: 'app-slide-06-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <section class="slide">
      <h1>What we produced</h1>
      <p class="lead">
        The same workflow, finished and committed. Numbers below are read from
        this repo's coverage reports — refreshed with
        <code>npm run results:refresh</code>.
      </p>

      <div class="cols">
        <div class="col">
          <h2>Commands</h2>
          <pre>npm test         # {{ results.webTests }} web + {{ results.serverTests }} server unit/integration
npm run e2e      # {{ results.e2eTests }} Playwright tests (live UI)
npm run coverage # HTML reports under coverage/</pre>
        </div>

        <div class="col">
          <h2>Results</h2>
          <div class="stats">
            <div class="stat">
              <div class="num">{{ results.totalUnitTests }}</div>
              <div class="label">unit + integration tests</div>
            </div>
            <div class="stat">
              <div class="num">{{ results.serverCoverage ?? '—' }}%</div>
              <div class="label">backend coverage</div>
            </div>
            <div class="stat">
              <div class="num">{{ results.webCoverage ?? '—' }}%</div>
              <div class="label">frontend coverage</div>
            </div>
            <div class="stat">
              <div class="num">{{ results.e2eTests }}</div>
              <div class="label">Playwright e2e</div>
            </div>
          </div>
        </div>
      </div>

      <p class="closing">
        Numbers refreshed {{ results.generatedAt }} ·
        diff with <code>git diff main..demo-finished --stat</code>
      </p>

      <p class="cta">
        <a mat-stroked-button color="primary" routerLink="/feedback">
          <mat-icon>open_in_new</mat-icon>
          <span>Try the demo feature</span>
        </a>
      </p>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        align-items: start;
        margin-bottom: 16px;
      }

      .col h2 {
        margin-top: 0;
      }

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .stat {
        padding: 16px 18px;
        background: var(--mitto-surface);
        border: 1px solid var(--mitto-divider);
        border-radius: 8px;
      }

      .stat .num {
        font-size: 44px;
        font-weight: 700;
        color: var(--mitto-fg);
        line-height: 1.05;
        letter-spacing: -0.02em;
      }

      .stat .label {
        font-size: 14px;
        color: var(--mitto-muted);
        margin-top: 4px;
      }

      .cta { margin-top: 24px; }
      .cta mat-icon { margin-right: 6px; }

      @media (max-width: 800px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class Slide06Results {
  protected readonly results = RESULTS;
}
