import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-results',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What that produced</h1>
      <p class="lead">
        The same workflow, finished and committed. Numbers below are from the
        actual test runs on this repo.
      </p>

      <div class="cols">
        <div class="col">
          <h2>Commands</h2>
          <pre>npm test         # 36 web + 32 server unit/integration
npm run e2e      # 4 Playwright tests (live UI)
npm run coverage # HTML reports under coverage/</pre>
        </div>

        <div class="col">
          <h2>Results</h2>
          <div class="stats">
            <div class="stat">
              <div class="num">72</div>
              <div class="label">tests passing</div>
            </div>
            <div class="stat">
              <div class="num">95%+</div>
              <div class="label">backend coverage</div>
            </div>
            <div class="stat">
              <div class="num">70%+</div>
              <div class="label">frontend coverage</div>
            </div>
            <div class="stat">
              <div class="num">4</div>
              <div class="label">e2e in 13s</div>
            </div>
          </div>
        </div>
      </div>

      <p class="closing">
        Read the diff with <code>git diff main..demo-finished --stat</code>.
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }

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

      @media (max-width: 800px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class Slide08Results {}
