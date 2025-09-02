"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { ibmPlexSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { PageQueryEnum } from "@/src/types/nuqs";
export default function QueryPage() {
  const [page, setPage] = useQueryState<PageQueryEnum>("page", {
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
        <Separator className="my-4" />
      </h3>
    </main>
  );
}
