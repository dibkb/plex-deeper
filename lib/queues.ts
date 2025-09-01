import { createQueue } from "./queue";
export const taskQueue = createQueue<{ jobId: string }>("search");
