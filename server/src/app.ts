import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import { healthRouter, feedbackRouter } from './routes/index.js';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: { message: 'Not Found' } });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = typeof (err as { status?: number })?.status === 'number' ? (err as { status: number }).status : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(status).json({ error: { message } });
}

export function createApp(): Application {
  const app = express();

  // CORS allowlist: env var in prod (same-origin makes it largely a no-op
  // anyway), localhost defaults for dev where the Angular dev server is
  // a separate origin from this backend.
  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:4300', 'http://localhost:4200'];
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/feedback', feedbackRouter);

  // In production, Express also serves the built Angular bundle when
  // STATIC_DIR points at apps/web/dist/web/browser. In dev STATIC_DIR is
  // unset and the Angular dev server (port 4300) handles the frontend.
  const staticDir = process.env.STATIC_DIR;
  if (staticDir) {
    app.use(express.static(staticDir));
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(staticDir, 'index.html'));
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
