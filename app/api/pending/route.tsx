import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
import { GoogleSearchResults } from "@/src/types/google-search-results";
import { ErrorResponse } from "@/src/types/http-response";
import { Status } from "@/src/types/status";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
export interface PendingResponse {
  id: string;
  searchResults: GoogleSearchResults[];
}
export async function GET(): Promise<
  NextResponse<PendingResponse[] | ErrorResponse>
> {
  try {
    const results = await db
      .select({
        id: queryResultsTable.id,
        searchResults: queryResultsTable.searchResults,
      })
      .from(queryResultsTable)
      .where(eq(queryResultsTable.status, Status.PENDING_WEB_SCRAPING))
      .orderBy(asc(queryResultsTable.createdAt))
      .limit(1)
      .execute();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
