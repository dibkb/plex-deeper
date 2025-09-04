import { createQueue } from "./queue";
import { QueueType } from "./queue-type";
export const shortDescriptionQueue = createQueue<{ queryId: string }>(
  QueueType.SHORT_DESCRIPTION
);

export const detailedDescriptionQueue = createQueue<{ queryId: string }>(
  QueueType.DETAILED_DESCRIPTION
);
