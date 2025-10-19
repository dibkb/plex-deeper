import { db } from "@/src/db";
import { createQueue } from "../lib/queue";
import { QueueType } from "@/lib/queue-type";
import { mastra } from "@/src/mastra";
import { queryResultsTable } from "@/src/schema";
import { eq } from "drizzle-orm";
import { Status } from "@/src/types/status";
import { googleSearch, googleSearchImages } from "@/src/tools/google-search";

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
    const googleSearchImagesResponse = await googleSearchImages(
      queryResult.query
    );
    await db
      .update(queryResultsTable)
      .set({
        status: Status.GENERATING_RESPONSE,
        images: googleSearchImagesResponse.data,
      })
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
    const detailedDescription = result.result.detailedDescription;
    await db
      .update(queryResultsTable)
      .set({
        detailedDescription: detailedDescription,
        status: Status.SUCCESS,
      })
      .where(eq(queryResultsTable.id, queryId))
      .execute();
  } catch (err: any) {
    throw err;
  }
});

// Keep the process alive and log startup
console.log("🚀 Detailed description worker started and listening for jobs...");

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("📴 Detailed description worker shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("📴 Detailed description worker shutting down gracefully...");
  process.exit(0);
});
