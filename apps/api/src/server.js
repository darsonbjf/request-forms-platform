import * as dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app.js';
import { assertRequiredEnv, env } from './config/env.js';
import { initializeOpenTelemetry } from './telemetry.js';

assertRequiredEnv();
await initializeOpenTelemetry();

const app = createApp();

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}${env.apiPrefix}`);
});
