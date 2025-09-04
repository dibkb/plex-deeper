import { db } from "@/src/db";
import { createQueue } from "../lib/queue";
import { QueueType } from "@/lib/queue-type";
import { mastra } from "@/src/mastra";
import { WorkflowType } from "@/src/mastra/type";
import { queryResultsTable } from "@/src/schema";
import { eq } from "drizzle-orm";
import { Status } from "@/src/types/status";

const detailedDescriptionQueue = createQueue<{ queryId: string }>(
  QueueType.DETAILED_DESCRIPTION,
  true
);

detailedDescriptionQueue.process(5, async (job) => {
  console.log(`⚙️ Processing detailed description job`);
  const queryId = job.data.queryId;
  try {
    const [queryResult] = await db
      .select()
      .from(queryResultsTable)
      .where(eq(queryResultsTable.id, queryId))
      .execute();
    if (!queryResult) {
      throw new Error("Query result not found");
    }
    //   mark the query result as generating response
    await db
      .update(queryResultsTable)
      .set({ status: Status.GENERATING_RESPONSE })
      .where(eq(queryResultsTable.id, queryId))
      .execute();
    const workflow = mastra.getWorkflow("detailedDescriptionWorkflow");
    const run = await workflow.createRunAsync();
    const result = await run.start({
      inputData: {
        query: queryResult.query,
        scrapedResults: queryResult.scrapedResults || [],
      },
    });
    if (result.status !== "success") {
      throw new Error("Failed to search company info");
    }
    const markdownContent = result.result.markdownContent;
    await db
      .update(queryResultsTable)
      .set({
        detailedDescription: markdownContent,
        status: Status.SUCCESS,
      })
      .where(eq(queryResultsTable.id, queryId))
      .execute();
  } catch (err: any) {
    throw err;
  }
});
