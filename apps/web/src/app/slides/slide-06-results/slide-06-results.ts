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

      <p class="cta">
        <a mat-flat-button color="primary" routerLink="/feedback">
          <mat-icon>open_in_new</mat-icon>
          <span>Try the demo feature</span>
        </a>
      </p>

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
          <div class="num">{{ results.e2eTests }}</div>
          <div class="label">Playwright e2e</div>
        </div>
        <div class="stat">
          <div class="num">{{ results.webCoverage ?? '—' }}%</div>
          <div class="label">frontend coverage</div>
        </div>
      </div>

      <div class="after">
        <p class="after-lead">After writing the code, the agent also:</p>
        <ul>
          <li>Cleaned up the code</li>
          <li>Reviewed it</li>
          <li>Updated the docs</li>
        </ul>
        <p class="closing">
          We can make these three steps standard in every task.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .cta {
        margin: 0 0 24px;
      }
      .cta mat-icon {
        margin-right: 6px;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 28px;
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

      .after-lead {
        margin: 0 0 8px;
        font-weight: 600;
        color: var(--mitto-fg);
      }

      .after ul {
        margin: 0 0 16px;
        padding-left: 22px;
        line-height: 1.7;
      }

      .closing {
        margin: 0;
        color: var(--mitto-muted);
        font-style: italic;
      }

      @media (max-width: 900px) {
        .stats {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class Slide06Results {
  protected readonly results = RESULTS;
}
