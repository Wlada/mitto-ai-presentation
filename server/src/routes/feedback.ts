import { Router } from 'express';
import { validateFeedback } from '../validators/feedback.js';
import { feedbackService } from '../services/feedback.service.js';
import type { FeedbackType } from '../types/feedback.js';

const FEEDBACK_TYPES: readonly FeedbackType[] = ['question', 'comment', 'suggestion'];

function isFeedbackType(value: unknown): value is FeedbackType {
  return typeof value === 'string' && (FEEDBACK_TYPES as readonly string[]).includes(value);
}

export const feedbackRouter = Router();

feedbackRouter.post('/', (req, res) => {
  const result = validateFeedback(req.body);
  if (!result.ok) {
    res.status(400).json({ error: { message: 'Validation failed', details: result.errors } });
    return;
  }
  const entry = feedbackService.add(result.value);
  res.status(201).json(entry);
});

feedbackRouter.get('/', (req, res) => {
  const { type } = req.query;
  if (type !== undefined) {
    if (!isFeedbackType(type)) {
      res.status(400).json({ error: { message: 'Invalid type filter' } });
      return;
    }
    res.status(200).json(feedbackService.list({ type }));
    return;
  }
  res.status(200).json(feedbackService.list());
});
