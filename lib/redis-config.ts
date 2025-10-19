// lib/redis-config.ts
const REDIS_URL = process.env.REDIS_URL!;
const { hostname, port, password } = new URL(REDIS_URL);

export const redisConfig = {
  host: hostname,
  port: Number(port),
  password,
  tls: {},

  connectTimeout: 10_000, // fail fast on first connect
  retryStrategy: (
    times: number // exponential back-off, max 30 s
  ) => Math.min(times * 500, 30_000),
  keepAlive: 60_000, // TCP keep-alive
};

export default redisConfig;
