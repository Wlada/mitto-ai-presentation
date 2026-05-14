import { describe, expect, it, vi } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../src/app.js';

function makeRes(): Response {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('errorHandler', () => {
  it('returns the err.status and err.message when the error carries a numeric status', () => {
    const res = makeRes();
    const err = Object.assign(new Error('teapot'), { status: 418 });

    errorHandler(err, {} as Request, res, vi.fn() as unknown as NextFunction);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ error: { message: 'teapot' } });
  });

  it('falls back to 500 and the generic message when the value is not an Error and has no status', () => {
    const res = makeRes();

    errorHandler('boom' as unknown, {} as Request, res, vi.fn() as unknown as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: { message: 'Internal Server Error' } });
  });
});
