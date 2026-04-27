export type FeedbackType = 'question' | 'comment' | 'suggestion';

export interface FeedbackInput {
  name?: string;
  type: FeedbackType;
  message: string;
}

export interface FeedbackEntry extends FeedbackInput {
  id: string;
  createdAt: string;
}
