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
      <h1>Takeaway</h1>
      <p class="takeaway">
        The value isn't agent autonomy.<br />
        It's a faster, controlled cycle<br />
        where the developer stays the owner.
      </p>
      <h2>Try it tomorrow</h2>
      <ul>
        <li>Write a <code>CLAUDE.md</code> for one repo</li>
        <li>Run one feature through plan-first</li>
        <li>Compare diff vs. how you'd write it</li>
      </ul>
      <p class="thanks">Thank you.</p>
      <p class="cta">
        <a mat-stroked-button color="primary" routerLink="/feedback">
          <mat-icon>chat_bubble_outline</mat-icon>
          <span>Leave a question or comment</span>
        </a>
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      h2 { font-size: 18px; font-weight: 600; margin: 32px 0 12px; }
      .takeaway {
        font-size: 20px;
        line-height: 1.5;
        color: var(--mitto-fg);
        margin: 0 0 16px;
        padding-left: 16px;
        border-left: 3px solid var(--mitto-accent);
      }
      .thanks {
        margin-top: 40px;
        font-size: 22px;
        font-weight: 600;
        color: var(--mitto-accent);
      }
      .cta { margin-top: 16px; }
      .cta mat-icon { margin-right: 6px; }
    `,
  ],
})
export class Slide11Conclusion {}
