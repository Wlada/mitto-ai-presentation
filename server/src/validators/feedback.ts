import type { FeedbackInput, FeedbackType } from '../types/feedback.js';

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; value: FeedbackInput }
  | { ok: false; errors: ValidationError[] };

const FEEDBACK_TYPES: readonly FeedbackType[] = ['question', 'comment', 'suggestion'];

function isFeedbackType(value: unknown): value is FeedbackType {
  return typeof value === 'string' && (FEEDBACK_TYPES as readonly string[]).includes(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateFeedback(input: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isPlainObject(input)) {
    return { ok: false, errors: [{ field: 'body', message: 'Body must be an object' }] };
  }

  const { type, message, name } = input;

  if (!isFeedbackType(type)) {
    errors.push({
      field: 'type',
      message: 'Type must be one of: question, comment, suggestion',
    });
  }

  let trimmedMessage = '';
  if (typeof message !== 'string') {
    errors.push({ field: 'message', message: 'Message is required and must be a string' });
  } else {
    trimmedMessage = message.trim();
    if (trimmedMessage.length < 1) {
      errors.push({ field: 'message', message: 'Message must not be empty' });
    } else if (trimmedMessage.length > 500) {
      errors.push({ field: 'message', message: 'Message must be at most 500 characters' });
    }
  }

  let trimmedName: string | undefined;
  if (name !== undefined) {
    if (typeof name !== 'string') {
      errors.push({ field: 'name', message: 'Name must be a string' });
    } else {
      trimmedName = name.trim();
      if (trimmedName.length > 50) {
        errors.push({ field: 'name', message: 'Name must be at most 50 characters' });
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const value: FeedbackInput = {
    type: type as FeedbackType,
    message: trimmedMessage,
  };
  if (trimmedName !== undefined) {
    value.name = trimmedName;
  }

  return { ok: true, value };
}
