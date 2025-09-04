import { db } from "@/src/db";
import { createQueue } from "../lib/queue";
import { QueueType } from "@/lib/queue-type";

const detailedDescriptionQueue = createQueue<{ queryId: string }>(
  QueueType.DETAILED_DESCRIPTION,
  true
);

detailedDescriptionQueue.process(5, async (job) => {
  console.log(`⚙️ Processing job`);
  const queryId = job.data.queryId;
  try {
  } catch (err: any) {
    throw err;
  }
});
