import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { queryResultsTable } from "@/src/schema";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { desc } from "drizzle-orm";
import { ErrorResponse } from "@/src/types/http-response";

export type HistoryResponse = {
  query: string;
  createdAt: Date;
  id: string;
};
export async function GET(
  request: Request
): Promise<NextResponse<HistoryResponse[] | ErrorResponse>> {
  try {
    const response = await db
      .select({
        query: queryResultsTable.query,
        createdAt: queryResultsTable.createdAt,
        id: queryResultsTable.id,
      })
      .from(queryResultsTable)
      .orderBy(desc(queryResultsTable.createdAt))
      .execute();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
