"use client";
import { QueryResultResponse } from "@/app/api/query/route";

export function ShortDescription({
  queryResult,
}: {
  queryResult: QueryResultResponse;
}) {
  const shortDescription = queryResult?.queryResult.shortDescription || "";
  return (
    <main className="mt-2">
      <p>{shortDescription}</p>
    </main>
  );
}
