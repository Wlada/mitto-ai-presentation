import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { FeedbackService } from './feedback.service';
import { FeedbackEntry } from './feedback.types';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FeedbackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('submit() POSTs to /api/feedback', () => {
    const input = { type: 'question' as const, message: 'hi' };
    const response: FeedbackEntry = {
      id: '1',
      createdAt: '2026-04-27T10:00:00Z',
      ...input,
    };

    let received: FeedbackEntry | undefined;
    service.submit(input).subscribe((entry) => (received = entry));

    const req = httpMock.expectOne('/api/feedback');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(input);
    req.flush(response);

    expect(received).toEqual(response);
  });

  it('list() GETs /api/feedback without params when no filter', () => {
    let received: FeedbackEntry[] | undefined;
    service.list().subscribe((data) => (received = data));

    const req = httpMock.expectOne((r) => r.url === '/api/feedback');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('type')).toBe(false);
    req.flush([]);

    expect(received).toEqual([]);
  });

  it('list(type) sends type query param', () => {
    service.list('comment').subscribe();
    const req = httpMock.expectOne((r) => r.url === '/api/feedback');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('type')).toBe('comment');
    req.flush([]);
  });

  it('propagates errors from submit()', () => {
    let errorStatus: number | undefined;
    service
      .submit({ type: 'question', message: 'x' })
      .subscribe({ error: (e) => (errorStatus = e.status) });

    const req = httpMock.expectOne('/api/feedback');
    req.flush({ error: { message: 'bad' } }, { status: 400, statusText: 'Bad Request' });

    expect(errorStatus).toBe(400);
  });
});
