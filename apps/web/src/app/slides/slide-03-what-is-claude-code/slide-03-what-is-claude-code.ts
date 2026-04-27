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
  styles: [':host { display: block; }'],
})
export class Slide03WhatIsClaudeCode {}
