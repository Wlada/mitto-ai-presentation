import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { feedbackService } from '../../src/services/feedback.service.js';

describe('feedback routes', () => {
  beforeEach(() => {
    feedbackService.clear();
  });

  describe('POST /api/feedback', () => {
    it('returns 201 and the stored entry on valid input', async () => {
      const app = createApp();
      const res = await request(app)
        .post('/api/feedback')
        .send({ type: 'question', message: 'How does caching work?', name: 'Alice' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        type: 'question',
        message: 'How does caching work?',
        name: 'Alice',
      });
      expect(typeof res.body.id).toBe('string');
      expect(typeof res.body.createdAt).toBe('string');
    });

    it('returns 400 with validation details on invalid input', async () => {
      const app = createApp();
      const res = await request(app).post('/api/feedback').send({ type: 'rant', message: '' });

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Validation failed');
      expect(Array.isArray(res.body.error.details)).toBe(true);
      expect(res.body.error.details.length).toBeGreaterThan(0);
    });

    it('returns 400 when body is not an object', async () => {
      const app = createApp();
      const res = await request(app).post('/api/feedback').send([]);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toBe('Validation failed');
      expect(res.body.error.details[0].field).toBe('body');
    });
  });

  describe('GET /api/feedback', () => {
    it('returns an array (empty initially)', async () => {
      const app = createApp();
      const res = await request(app).get('/api/feedback');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all entries sorted desc', async () => {
      const app = createApp();
      await request(app).post('/api/feedback').send({ type: 'question', message: 'first' });
      await new Promise((r) => setTimeout(r, 5));
      await request(app).post('/api/feedback').send({ type: 'comment', message: 'second' });

      const res = await request(app).get('/api/feedback');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].message).toBe('second');
      expect(res.body[1].message).toBe('first');
    });

    it('filters by valid type', async () => {
      const app = createApp();
      await request(app).post('/api/feedback').send({ type: 'question', message: 'q' });
      await request(app).post('/api/feedback').send({ type: 'comment', message: 'c' });

      const res = await request(app).get('/api/feedback?type=question');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].type).toBe('question');
    });

    it('returns 400 on invalid type filter', async () => {
      const app = createApp();
      const res = await request(app).get('/api/feedback?type=bogus');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: { message: 'Invalid type filter' } });
    });
  });
});
