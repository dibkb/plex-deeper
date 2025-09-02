"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { ibmPlexSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { PageQueryEnum } from "@/src/types/nuqs";
import { PageToggle } from "@/app/_coponents/page-toggle";
import { ShortDescription } from "@/app/_coponents/pages/short-description";
export default function QueryPage() {
  const [page] = useQueryState<PageQueryEnum>("page", {
    defaultValue: PageQueryEnum.SHORT_DESCRIPTION,
    parse: (value) => value as PageQueryEnum,
  });
  const { qid } = useParams();
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
      {page === PageQueryEnum.SHORT_DESCRIPTION && (
        <ShortDescription queryResult={queryResult!} />
      )}
    </main>
  );
}
