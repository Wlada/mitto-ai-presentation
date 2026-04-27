import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slide-11-conclusion',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <section class="slide">
      <h1>Conclusion and next steps</h1>
      <p class="takeaway">
        The value isn't agent autonomy — it's a faster, controlled, repeatable engineering process
        where the developer remains the owner.
      </p>
      <h2>What to try tomorrow</h2>
      <ul>
        <li>Write one CLAUDE.md for your repo</li>
        <li>Use plan-mode before any change touches code</li>
        <li>Run a code-reviewer subagent on your next PR</li>
      </ul>
      <p class="cta">
        <a mat-stroked-button color="primary" routerLink="/feedback">
          <mat-icon>chat_bubble_outline</mat-icon>
          <span>Leave a question or comment</span>
        </a>
      </p>
      <p class="thanks">Thank you.</p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .slide { max-width: 800px; }
      h1 { font-size: 36px; line-height: 1.2; margin: 0 0 24px; font-weight: 700; }
      h2 { font-size: 18px; font-weight: 600; margin: 32px 0 12px; }
      .takeaway {
        font-size: 20px;
        line-height: 1.5;
        color: var(--mitto-fg);
        margin: 0 0 16px;
        padding-left: 16px;
        border-left: 3px solid var(--mitto-accent);
      }
      ul { font-size: 17px; line-height: 1.8; padding-left: 1.25rem; margin: 0; }
      li { margin-bottom: 8px; }
      .cta { margin-top: 24px; }
      .cta mat-icon { margin-right: 6px; }
      .thanks {
        margin-top: 48px;
        font-size: 22px;
        font-weight: 600;
        color: var(--mitto-accent);
      }
    `,
  ],
})
export class Slide11Conclusion {}
