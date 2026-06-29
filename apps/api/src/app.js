import express from 'express';
import cors from 'cors';

import { env, getCorsOrigins } from './config/env.js';
import { observeHttpRequests, exposeMetricsEndpoint } from './telemetry.js';
import { registerRoutes } from './routes/index.js';

export function createApp() {
  const app = express();
  const configuredOrigins = getCorsOrigins();
  const allowAnyOrigin = configuredOrigins.includes('*');

  app.set('trust proxy', true);

  app.use(cors({
    origin: allowAnyOrigin ? '*' : configuredOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: !allowAnyOrigin,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(observeHttpRequests);

  app.get('/metrics', exposeMetricsEndpoint);

  registerRoutes(app, env.apiPrefix);

  return app;
}
