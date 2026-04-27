import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { healthRouter } from './routes/index.js';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: 'http://localhost:4200' }));
  app.use(express.json());

  app.use('/api/health', healthRouter);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: { message: 'Not Found' } });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const status = typeof (err as { status?: number })?.status === 'number' ? (err as { status: number }).status : 500;
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(status).json({ error: { message } });
  });

  return app;
}
