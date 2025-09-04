import { detailedDescriptionQueue } from "@/lib/queues";
import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
import { ScrapedResultsSchema } from "@/src/types/google-search-results";
import { ErrorResponse } from "@/src/types/http-response";
import { Status } from "@/src/types/status";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
type NextRequestContext = {
  params: Promise<{
    qid: string;
  }>;
};
export async function POST(
  request: Request,
  { params }: NextRequestContext
): Promise<NextResponse<{ success: boolean } | ErrorResponse>> {
  try {
    const { qid } = await params;
    const { scrapedResults } = await request.json();
    const results = ScrapedResultsSchema.safeParse(scrapedResults);

    if (!results.success) {
      return NextResponse.json(
        { error: results.error.message },
        { status: 400 }
      );
    }
    const [item] = await db
      .select({
        id: queryResultsTable.id,
        status: queryResultsTable.status,
      })
      .from(queryResultsTable)
      .where(eq(queryResultsTable.id, qid))
      .limit(1)
      .execute();
    if (!item) {
      return NextResponse.json(
        { error: "Query result not found" },
        { status: 404 }
      );
    }
    if (item.status === Status.WEB_SCRAPING_COMPLETED) {
      return NextResponse.json(
        { error: "Query result already scraped" },
        { status: 400 }
      );
    }
    await db
      .update(queryResultsTable)
      .set({
        scrapedResults: results.data,
        status: Status.WEB_SCRAPING_COMPLETED,
      })
      .where(eq(queryResultsTable.id, qid))
      .execute();
    const job = await detailedDescriptionQueue
      .createJob({ queryId: qid })
      .save();
    return NextResponse.json({ success: true, jobId: job.id });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
