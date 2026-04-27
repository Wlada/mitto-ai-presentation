import { describe, expect, it } from 'vitest';
import { validateFeedback } from '../../src/validators/feedback.js';

describe('validateFeedback', () => {
  it('accepts valid input with all fields', () => {
    const result = validateFeedback({ name: 'Alice', type: 'question', message: 'How does it work?' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ name: 'Alice', type: 'question', message: 'How does it work?' });
    }
  });

  it('accepts valid input without name', () => {
    const result = validateFeedback({ type: 'comment', message: 'Nice talk' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ type: 'comment', message: 'Nice talk' });
      expect(result.value.name).toBeUndefined();
    }
  });

  it('rejects non-object body (null)', () => {
    const result = validateFeedback(null);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual([{ field: 'body', message: 'Body must be an object' }]);
    }
  });

  it('rejects non-object body (array)', () => {
    const result = validateFeedback([]);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]?.field).toBe('body');
    }
  });

  it('rejects non-object body (string)', () => {
    const result = validateFeedback('hello');
    expect(result.ok).toBe(false);
  });

  it('rejects unknown type', () => {
    const result = validateFeedback({ type: 'rant', message: 'hi' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'type')).toBe(true);
    }
  });

  it('rejects missing type', () => {
    const result = validateFeedback({ message: 'hi' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'type')).toBe(true);
    }
  });

  it('rejects missing message', () => {
    const result = validateFeedback({ type: 'question' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'message')).toBe(true);
    }
  });

  it('rejects non-string message', () => {
    const result = validateFeedback({ type: 'question', message: 123 });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'message')).toBe(true);
    }
  });

  it('rejects message that is too long (501 chars)', () => {
    const result = validateFeedback({ type: 'question', message: 'a'.repeat(501) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'message' && /500/.test(e.message))).toBe(true);
    }
  });

  it('accepts message at exactly 500 chars', () => {
    const result = validateFeedback({ type: 'question', message: 'a'.repeat(500) });
    expect(result.ok).toBe(true);
  });

  it('rejects whitespace-only message', () => {
    const result = validateFeedback({ type: 'question', message: '   \t\n  ' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'message')).toBe(true);
    }
  });

  it('rejects name that is too long (51 chars)', () => {
    const result = validateFeedback({ type: 'question', message: 'hi', name: 'a'.repeat(51) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'name')).toBe(true);
    }
  });

  it('accepts name at exactly 50 chars', () => {
    const result = validateFeedback({ type: 'question', message: 'hi', name: 'a'.repeat(50) });
    expect(result.ok).toBe(true);
  });

  it('rejects non-string name', () => {
    const result = validateFeedback({ type: 'question', message: 'hi', name: 42 });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.field === 'name')).toBe(true);
    }
  });

  it('trims string fields in returned value', () => {
    const result = validateFeedback({
      type: 'suggestion',
      message: '  trim me  ',
      name: '  Bob  ',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.message).toBe('trim me');
      expect(result.value.name).toBe('Bob');
    }
  });

  it('returns multiple errors at once', () => {
    const result = validateFeedback({ type: 'bogus', message: '', name: 'a'.repeat(51) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      const fields = result.errors.map((e) => e.field);
      expect(fields).toContain('type');
      expect(fields).toContain('message');
      expect(fields).toContain('name');
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    }
  });
});
