import { createQueue } from "../lib/queue";

const taskQueue = createQueue<{ jobId: string }>("search", true);

taskQueue.process(5, async (job) => {
  console.log(`⚙️ Processing job`);
  console.log(job.id);
  console.log(job.data);
  console.log(job.data.jobId);
  try {
    // simulate some work
    await new Promise((res) => setTimeout(res, 3000));

    const result = { message: "Task completed", input: job.data.jobId };

    return result;
  } catch (err: any) {
    throw err;
  }
});
