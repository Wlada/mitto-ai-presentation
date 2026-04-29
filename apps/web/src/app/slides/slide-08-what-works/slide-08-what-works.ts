import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-08-what-works',
  standalone: true,
  template: `
    <section class="slide">
      <h1>What agents are good at</h1>
      <ul>
        <li>Adding new features that follow patterns you already have</li>
        <li>Writing tests</li>
        <li>Wiring up components, routes, services</li>
        <li>Cleaning up repetitive code</li>
        <li>Reading unfamiliar code (without changing it)</li>
      </ul>
    </section>
  `,
  styles: [':host { display: block; }'],
})
export class Slide08WhatWorks {}
