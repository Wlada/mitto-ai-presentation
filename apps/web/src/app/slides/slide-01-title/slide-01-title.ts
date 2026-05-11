import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-01-title',
  standalone: true,
  template: `
    <section class="slide title-slide">
      <h1>Claude Code in Practice</h1>
      <p class="subtitle">AI agents in everyday work</p>
      <p class="presenter">Vladimir Bujanovic · Mitto · 2026</p>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .title-slide {
        padding-top: 64px;
      }
      h1 {
        font-size: 40px;
        margin: 0 0 16px;
        letter-spacing: normal;
      }
      .subtitle {
        font-size: 20px;
        color: var(--mitto-muted);
        margin: 0 0 48px;
        line-height: 1.4;
      }
      .presenter {
        font-size: 16px;
        color: var(--mitto-muted);
        margin: 0;
      }
    `,
  ],
})
export class Slide01Title {}
