"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { ibmPlexSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { PageQueryEnum } from "@/src/types/nuqs";
import { PageToggle } from "@/app/_components/page-toggle";
import { ShortDescription } from "@/app/_components/pages/short-description";
import { SourcesPreview } from "@/app/_components/souces-preview";
import { SourcesPage } from "@/app/_components/pages/sources";
import { DetailedDescription } from "@/app/_components/pages/detailed-description";
export default function QueryPage() {
  const [page] = useQueryState<PageQueryEnum>("page", {
    defaultValue: PageQueryEnum.SHORT_RESPONSE,
    parse: (value) => value as PageQueryEnum,
  });
  const { qid } = useParams<{ qid: string }>();
  const {
    data: queryResult,
    isLoading,
    error,
  } = useQuery<QueryResultResponse>({
    queryKey: ["query", qid],
    queryFn: () =>
      axios
        .get<QueryResultResponse>(`/api/query`, { params: { qid } })
        .then((res) => res.data),
    enabled: Boolean(qid),
    refetchInterval: 1000,
  });
  return (
    <main className="pt-16 max-w-4xl mx-auto">
      <h3
        className={cn(
          ibmPlexSerif.className,
          "text-3xl text-zinc-900 dark:text-zinc-200"
        )}
      >
        {queryResult?.queryResult.query}
      </h3>
      <PageToggle />
      <SourcesPreview queryResult={queryResult!} />
      {page === PageQueryEnum.SHORT_RESPONSE && (
        <ShortDescription
          status={queryResult?.queryResult.status}
          shortDescription={queryResult?.queryResult.shortDescription || ""}
        />
      )}
      {page === PageQueryEnum.DETAILED_RESULTS && (
        <DetailedDescription
          status={queryResult?.queryResult.status}
          detailedDescription={
            queryResult?.queryResult.detailedDescription || []
          }
          images={
            queryResult?.queryResult.scrapedResults
              ?.flatMap((result) => result.image)
              .slice(0, 4) || []
          }
        />
      )}
      {page === PageQueryEnum.SOURCES && (
        <SourcesPage sources={queryResult?.queryResult.searchResults || []} />
      )}
    </main>
  );
}
