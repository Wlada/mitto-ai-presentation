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
          import('./slide-05-demo-task/slide-05-demo-task').then((m) => m.Slide05DemoTask),
      },
      {
        path: '6',
        loadComponent: () =>
          import('./slide-06-live-flow/slide-06-live-flow').then((m) => m.Slide06LiveFlow),
      },
      {
        path: '7',
        loadComponent: () =>
          import('./slide-07-results/slide-07-results').then((m) => m.Slide07Results),
      },
      {
        path: '8',
        loadComponent: () =>
          import('./slide-08-what-works/slide-08-what-works').then((m) => m.Slide08WhatWorks),
      },
      {
        path: '9',
        loadComponent: () =>
          import('./slide-09-limits/slide-09-limits').then((m) => m.Slide09Limits),
      },
      {
        path: '10',
        loadComponent: () =>
          import('./slide-10-team-model/slide-10-team-model').then((m) => m.Slide10TeamModel),
      },
      {
        path: '11',
        loadComponent: () =>
          import('./slide-11-conclusion/slide-11-conclusion').then((m) => m.Slide11Conclusion),
      },
      { path: '', redirectTo: '1', pathMatch: 'full' },
    ],
  },
];
