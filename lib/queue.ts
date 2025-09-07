import Queue from "bee-queue";
import redisConfig from "./redis-config";

export function createQueue<T>(name: string, isWorker = false) {
  return new Queue<T>(name, {
    redis: redisConfig,
    isWorker,
  });
}
