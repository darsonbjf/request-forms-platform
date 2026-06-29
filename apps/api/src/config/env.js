export const env = {
  apiPrefix: process.env.API_PREFIX || '',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: Number(process.env.PORT || 3001),
};

export function assertRequiredEnv() {
  const missing = [];

  if (!env.databaseUrl) missing.push('DATABASE_URL');
  if (!env.jwtSecret) missing.push('JWT_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export function getCorsOrigins() {
  return env.corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}
