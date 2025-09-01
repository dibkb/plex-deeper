import Queue from "bee-queue";

export function createQueue<T = any>(name: string, isWorker = false) {
  return new Queue<T>(name, {
    redis: { host: "127.0.0.1", port: 9000 },
    isWorker,
  });
}
