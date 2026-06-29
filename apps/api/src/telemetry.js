import client from 'prom-client';

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status_code'],
});

export function observeHttpRequests(req, res, next) {
  res.on('finish', () => {
    httpRequestCounter
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  next();
}

export async function exposeMetricsEndpoint(req, res) {
  try {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err.message);
  }
}

export async function initializeOpenTelemetry() {
  return null;
}

export const tracer = {
  startSpan: () => ({
    recordException: () => {},
    end: () => {},
  }),
};
