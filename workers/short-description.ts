import { db } from "@/src/db";
import { createQueue } from "../lib/queue";
import { queryResultsTable } from "@/src/schema";
import { eq } from "drizzle-orm";
import { shortDescriptionAgent } from "@/src/mastra/agents/auto-complete";
import { ShortDescriptionSchema } from "@/src/types/agents";
import { Status } from "@/src/types/status";
import { QueueType } from "@/lib/queue-type";

const shortDescriptionQueue = createQueue<{ queryId: string }>(
  QueueType.SHORT_DESCRIPTION,
  true
);

shortDescriptionQueue.process(5, async (job) => {
  console.log(`⚙️ Processing short description job`);
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
    const { query, searchResults } = queryResult;
    const response = await shortDescriptionAgent.generate(
      [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Query: ${query} \n Search Results: ${searchResults
                .map((result) => `${result.title} \n ${result.snippet}`)
                .join("\n")}`,
            },
          ],
        },
      ],
      {
        experimental_output: ShortDescriptionSchema,
      }
    );
    const parsed = ShortDescriptionSchema.safeParse(response.object);
    if (!parsed.success) {
      throw new Error("Invalid response format from short description agent");
    }
    const { shortDescription } = parsed.data;
    await db
      .update(queryResultsTable)
      .set({ shortDescription, status: Status.PENDING_WEB_SCRAPING })
      .where(eq(queryResultsTable.id, queryId))
      .execute();
  } catch (err: any) {
    throw err;
  }
});

console.log("🚀 Short description worker started and listening for jobs...");

process.on("SIGTERM", () => {
  console.log("📴 Short description worker shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("📴 Short description worker shutting down gracefully...");
  process.exit(0);
});

shortDescriptionQueue.on("error", (err) => {
  console.error("Redis error – exiting so PM2 restarts the worker", err);
  process.exit(1);
});
