import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-03-what-is-claude-code',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What Claude Code is (in practice)</h1>
      <p class="lead">
        A terminal-based agent that runs in your repo, reads your project context, and uses tools
        — not autocomplete in an editor.
      </p>
      <ul>
        <li>Orchestrator — plans and executes multi-step work</li>
        <li>Skills — reusable workflows (brainstorm, plan, review)</li>
        <li>Subagents — parallel workers with their own context</li>
        <li>CLAUDE.md — project conventions the agent always sees</li>
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
export class Slide03WhatIsClaudeCode {}
