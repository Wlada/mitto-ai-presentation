import { Routes } from '@angular/router';

import { SlideLayout } from './slide-layout/slide-layout';

export const SLIDE_ROUTES: Routes = [
  {
    path: '',
    component: SlideLayout,
    children: [
      {
        path: '1',
        loadComponent: () => import('./slide-01-title/slide-01-title').then((m) => m.Slide01Title),
      },
      {
        path: '2',
        loadComponent: () =>
          import('./slide-02-what-is-claude-code/slide-02-what-is-claude-code').then(
            (m) => m.Slide02WhatIsClaudeCode,
          ),
      },
      {
        path: '3',
        loadComponent: () =>
          import('./slide-03-prompts-not-enough/slide-03-prompts-not-enough').then(
            (m) => m.Slide03PromptsNotEnough,
          ),
      },
      {
        path: '4',
        loadComponent: () =>
          import('./slide-04-architecture/slide-04-architecture').then((m) => m.Slide04Architecture),
      },
      {
        path: '5',
        loadComponent: () =>
          import('./slide-05-live-flow/slide-05-live-flow').then((m) => m.Slide05LiveFlow),
      },
      {
        path: '6',
        loadComponent: () =>
          import('./slide-06-results/slide-06-results').then((m) => m.Slide06Results),
      },
      {
        path: '7',
        loadComponent: () =>
          import('./slide-07-what-works/slide-07-what-works').then((m) => m.Slide07WhatWorks),
      },
      {
        path: '8',
        loadComponent: () =>
          import('./slide-08-limits/slide-08-limits').then((m) => m.Slide08Limits),
      },
      {
        path: '9',
        loadComponent: () =>
          import('./slide-09-conclusion/slide-09-conclusion').then((m) => m.Slide09Conclusion),
      },
      { path: '', redirectTo: '1', pathMatch: 'full' },
    ],
  },
];
