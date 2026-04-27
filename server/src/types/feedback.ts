export const FEEDBACK_TYPES = ['question', 'comment', 'suggestion'] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export function isFeedbackType(value: unknown): value is FeedbackType {
  return typeof value === 'string' && (FEEDBACK_TYPES as readonly string[]).includes(value);
}

export interface FeedbackInput {
  name?: string;
  type: FeedbackType;
  message: string;
}

export interface FeedbackEntry extends FeedbackInput {
  id: string;
  createdAt: string;
}
