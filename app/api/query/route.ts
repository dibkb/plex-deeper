import { taskQueue } from "@/lib/queues";
import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
import { googleSearch } from "@/src/tools/google-search";
import { Status } from "@/src/types/status";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  const response = await googleSearch(query);

  const [insertedRow] = await db
    .insert(queryResultsTable)
    .values({
      id: crypto.randomUUID().toString(),
      query,
      searchResults: response.data,
      status: Status.PENDING,
    })
    .returning({ insertedId: queryResultsTable.id })
    .execute();

  const job = await taskQueue
    .createJob({ jobId: insertedRow.insertedId.toString() })
    .save();

  return NextResponse.json({
    jobId: job.id,
    insertedId: insertedRow.insertedId,
  });
}
