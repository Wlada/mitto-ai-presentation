import { describe, expect, it } from 'vitest';
import { relativeTime } from './relative-time';

describe('relativeTime', () => {
  const now = new Date('2026-04-27T12:00:00.000Z').getTime();

  it('returns empty string for invalid date', () => {
    expect(relativeTime('not-a-date', now)).toBe('');
  });

  it('returns "just now" within 5 seconds', () => {
    expect(relativeTime('2026-04-27T11:59:58.000Z', now)).toBe('just now');
  });

  it('returns seconds ago under a minute', () => {
    expect(relativeTime('2026-04-27T11:59:30.000Z', now)).toBe('30 seconds ago');
  });

  it('returns "1 minute ago" at exactly 1 minute', () => {
    expect(relativeTime('2026-04-27T11:59:00.000Z', now)).toBe('1 minute ago');
  });

  it('returns minutes plural form', () => {
    expect(relativeTime('2026-04-27T11:58:00.000Z', now)).toBe('2 minutes ago');
  });

  it('returns hours ago', () => {
    expect(relativeTime('2026-04-27T10:00:00.000Z', now)).toBe('2 hours ago');
  });

  it('returns days ago', () => {
    expect(relativeTime('2026-04-25T12:00:00.000Z', now)).toBe('2 days ago');
  });
});
