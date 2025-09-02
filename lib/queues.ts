import { createQueue } from "./queue";
export const taskQueue = createQueue<{ queryId: string }>("search");
