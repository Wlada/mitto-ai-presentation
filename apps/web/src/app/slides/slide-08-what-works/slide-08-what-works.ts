import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-what-works',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What agents do well</h1>
      <p class="lead">
        Where the cost-benefit is clearly positive — repeatable, well-scoped engineering work.
      </p>
      <ul>
        <li>CRUD endpoints, validators, and matching tests</li>
        <li>Form components with consistent shape across pages</li>
        <li>Refactors that follow a clear mechanical rule</li>
        <li>Test scaffolding and fixture setup</li>
        <li>Documentation that mirrors the code</li>
      </ul>
    </section>
  `,
  styles: [':host { display: block; }'],
})
export class Slide08WhatWorks {}
