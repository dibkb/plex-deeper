const REDIS_URL = process.env.REDIS_URL;
const { hostname, port, password } = new URL(REDIS_URL || "");
export const redisConfig = {
  host: hostname,
  port: Number(port),
  password,
  tls: {},
};

export default redisConfig;
