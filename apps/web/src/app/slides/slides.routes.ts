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
          import('./slide-02-why-agents/slide-02-why-agents').then((m) => m.Slide02WhyAgents),
      },
      {
        path: '3',
        loadComponent: () =>
          import('./slide-03-what-is-claude-code/slide-03-what-is-claude-code').then(
            (m) => m.Slide03WhatIsClaudeCode,
          ),
      },
      {
        path: '4',
        loadComponent: () =>
          import('./slide-04-prompts-not-enough/slide-04-prompts-not-enough').then(
            (m) => m.Slide04PromptsNotEnough,
          ),
      },
      {
        path: '5',
        loadComponent: () =>
          import('./slide-05-architecture/slide-05-architecture').then((m) => m.Slide05Architecture),
      },
      {
        path: '6',
        loadComponent: () =>
          import('./slide-06-demo-task/slide-06-demo-task').then((m) => m.Slide06DemoTask),
      },
      {
        path: '7',
        loadComponent: () =>
          import('./slide-07-live-flow/slide-07-live-flow').then((m) => m.Slide07LiveFlow),
      },
      {
        path: '8',
        loadComponent: () =>
          import('./slide-08-results/slide-08-results').then((m) => m.Slide08Results),
      },
      {
        path: '9',
        loadComponent: () =>
          import('./slide-09-what-works/slide-09-what-works').then((m) => m.Slide09WhatWorks),
      },
      {
        path: '10',
        loadComponent: () =>
          import('./slide-10-limits/slide-10-limits').then((m) => m.Slide10Limits),
      },
      {
        path: '11',
        loadComponent: () =>
          import('./slide-11-team-model/slide-11-team-model').then((m) => m.Slide11TeamModel),
      },
      {
        path: '12',
        loadComponent: () =>
          import('./slide-12-conclusion/slide-12-conclusion').then((m) => m.Slide12Conclusion),
      },
      { path: '', redirectTo: '1', pathMatch: 'full' },
    ],
  },
];
