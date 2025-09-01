import { taskQueue } from "@/lib/queues";
import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
import { googleSearch } from "@/src/tools/google-search";
import { ErrorResponse } from "@/src/types/http-response";
import { Status } from "@/src/types/status";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export interface QueryResponse {
  jobId: string;
  insertedId: string;
}

export async function POST(
  request: Request
): Promise<NextResponse<QueryResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("search");
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    const googleSearchResponse = await googleSearch(query);

    const [insertedRow] = await db
      .insert(queryResultsTable)
      .values({
        id: crypto.randomUUID().toString(),
        query,
        searchResults: googleSearchResponse.data,
        status: Status.PENDING,
      })
      .returning({ insertedId: queryResultsTable.id })
      .execute();

    const job = await taskQueue
      .createJob({ jobId: insertedRow.insertedId.toString() })
      .save();
    const response = NextResponse.json({
      jobId: job.id,
      insertedId: insertedRow.insertedId,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
