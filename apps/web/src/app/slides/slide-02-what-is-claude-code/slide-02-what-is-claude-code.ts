import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-02-what-is-claude-code',
  standalone: true,
  template: `
    <section class="slide">
      <h1>Claude Code CLI</h1>
      <p class="lead">A local CLI agent that:</p>
      <ul>
        <li>reads your repo</li>
        <li>edits your files</li>
        <li>runs your commands</li>
        <li>follows project-specific rules</li>
      </ul>
      <p class="closing">
        Works in your terminal. You decide what runs.
      </p>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .closing {
        margin: 32px 0 0;
        font-size: 18px;
        line-height: 1.6;
        color: var(--mitto-fg);
        font-style: normal;
      }
    `,
  ],
})
export class Slide02WhatIsClaudeCode {}
