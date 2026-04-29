import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slide-10-conclusion',
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
      <p class="closer">
        Treat the agent as a fast junior.<br />
        Treat yourself as the senior.
      </p>
      <p class="note">
        Licenses are coming soon. I'm here for questions
        and happy to share what I learned.
      </p>
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
      .takeaway {
        font-size: 20px;
        line-height: 1.5;
        color: var(--mitto-fg);
        margin: 0 0 16px;
        padding: 0 0 0 16px;
        background: transparent;
        border-left: 3px solid var(--mitto-accent);
        border-radius: 0;
      }
      .closer {
        margin: 28px 0 0;
        padding: 0 0 0 16px;
        font-size: 20px;
        line-height: 1.5;
        font-weight: 600;
        color: var(--mitto-fg);
        border-left: 3px solid var(--mitto-accent);
      }
      .note {
        margin: 28px 0 0;
        font-size: 16px;
        line-height: 1.55;
        color: var(--mitto-muted);
      }
      .thanks {
        margin-top: 28px;
        font-size: 22px;
        font-weight: 600;
        color: var(--mitto-accent);
      }
      .cta { margin-top: 16px; }
      .cta mat-icon { margin-right: 6px; }
    `,
  ],
})
export class Slide10Conclusion {}
