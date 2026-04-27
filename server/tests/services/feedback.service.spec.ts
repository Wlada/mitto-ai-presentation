import { beforeEach, describe, expect, it } from 'vitest';
import { FeedbackService } from '../../src/services/feedback.service.js';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(() => {
    service = new FeedbackService();
  });

  it('add returns an entry with id and ISO createdAt', () => {
    const entry = service.add({ type: 'question', message: 'why?' });
    expect(entry.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(entry.type).toBe('question');
    expect(entry.message).toBe('why?');
    expect(new Date(entry.createdAt).toISOString()).toBe(entry.createdAt);
  });

  it('add preserves optional name', () => {
    const entry = service.add({ type: 'comment', message: 'hi', name: 'Eve' });
    expect(entry.name).toBe('Eve');
  });

  it('list returns entries sorted by createdAt descending', async () => {
    const a = service.add({ type: 'question', message: 'first' });
    await new Promise((r) => setTimeout(r, 5));
    const b = service.add({ type: 'comment', message: 'second' });
    await new Promise((r) => setTimeout(r, 5));
    const c = service.add({ type: 'suggestion', message: 'third' });

    const list = service.list();
    expect(list.map((e) => e.id)).toEqual([c.id, b.id, a.id]);
  });

  it('list returns an empty array when nothing has been added', () => {
    expect(service.list()).toEqual([]);
  });

  it('list filters by type', async () => {
    service.add({ type: 'question', message: 'q1' });
    await new Promise((r) => setTimeout(r, 2));
    service.add({ type: 'comment', message: 'c1' });
    await new Promise((r) => setTimeout(r, 2));
    service.add({ type: 'question', message: 'q2' });

    const questions = service.list({ type: 'question' });
    expect(questions).toHaveLength(2);
    expect(questions.every((e) => e.type === 'question')).toBe(true);

    expect(service.list({ type: 'suggestion' })).toEqual([]);
  });

  it('clear empties storage', () => {
    service.add({ type: 'question', message: 'one' });
    service.add({ type: 'comment', message: 'two' });
    expect(service.list()).toHaveLength(2);
    service.clear();
    expect(service.list()).toEqual([]);
  });
});
