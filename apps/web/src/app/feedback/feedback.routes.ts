import { Routes } from '@angular/router';

import { FeedbackForm } from './feedback-form/feedback-form';
import { FeedbackList } from './feedback-list/feedback-list';
import { FeedbackPage } from './feedback-page/feedback-page';

export const FEEDBACK_ROUTES: Routes = [
  { path: '', component: FeedbackPage },
  { path: 'submit', component: FeedbackForm },
  { path: 'list', component: FeedbackList },
];
