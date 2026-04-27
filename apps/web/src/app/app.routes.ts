import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.routes').then((m) => m.SLIDE_ROUTES),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.routes').then((m) => m.FEEDBACK_ROUTES),
  },
  { path: '', redirectTo: '/slides/1', pathMatch: 'full' },
  { path: '**', redirectTo: '/slides/1' },
];
