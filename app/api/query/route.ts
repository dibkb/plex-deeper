import { shortDescriptionQueue } from "@/lib/queues";
import { db } from "@/src/db";
import { QueryResult, queryResultsTable } from "@/src/schema";
import { googleSearch } from "@/src/tools/google-search";
import { ErrorResponse } from "@/src/types/http-response";
import { Status } from "@/src/types/status";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
import { z } from "zod";
export interface QueryResponse {
  jobId: string;
  queryId: string;
}
export interface QueryResultResponse {
  queryResult: QueryResult;
}
const schema = z.object({
  query: z.string().min(1),
});
export async function POST(
  request: Request
): Promise<NextResponse<QueryResponse | ErrorResponse>> {
  try {
    const query = schema.safeParse(await request.json());
    if (!query.success) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    const data = query.data;
    const googleSearchResponse = await googleSearch(data.query);
    const [insertedRow] = await db
      .insert(queryResultsTable)
      .values({
        id: crypto.randomUUID().toString(),
        query: data.query,
        searchResults: googleSearchResponse.data,
        status: Status.PENDING,
      })
      .returning({ insertedId: queryResultsTable.id })
      .execute();

    const job = await shortDescriptionQueue
      .createJob({ queryId: insertedRow.insertedId.toString() })
      .save();
    const response = NextResponse.json({
      jobId: job.id,
      queryId: insertedRow.insertedId,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request
): Promise<NextResponse<QueryResultResponse | ErrorResponse>> {
  const { searchParams } = new URL(request.url);
  const qid = searchParams.get("qid");
  if (!qid) {
    return NextResponse.json(
      { error: "Query ID is required" },
      { status: 400 }
    );
  }
  const [queryResult] = await db
    .select()
    .from(queryResultsTable)
    .where(eq(queryResultsTable.id, qid))
    .execute();
  if (!queryResult) {
    return NextResponse.json(
      { error: "Query result not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ queryResult });
}
