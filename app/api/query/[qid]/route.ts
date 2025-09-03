import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
import { ScrapedResultsSchema } from "@/src/types/google-search-results";
import { ErrorResponse } from "@/src/types/http-response";
import { Status } from "@/src/types/status";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { qid: string } }
): Promise<NextResponse<{ success: boolean } | ErrorResponse>> {
  try {
    const { qid } = params;
    const results = ScrapedResultsSchema.safeParse(await request.json());
    if (!results.success) {
      return NextResponse.json({ error: "Invalid results" }, { status: 400 });
    }
    await db
      .update(queryResultsTable)
      .set({
        scrapedResults: results.data,
        status: Status.WEB_SCRAPING_COMPLETED,
      })
      .where(eq(queryResultsTable.id, qid))
      .execute();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
