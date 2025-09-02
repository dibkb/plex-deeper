"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { Button } from "@/components/ui/button";
import getFavicon from "@/lib/utils";
import { PageQueryEnum } from "@/src/types/nuqs";
import { useQueryState } from "nuqs";

export function SourcesPreview({
  queryResult,
}: {
  queryResult: QueryResultResponse;
}) {
  const [page, setPage] = useQueryState<PageQueryEnum>("page", {
    defaultValue: PageQueryEnum.SHORT_DESCRIPTION,
    parse: (value) => value as PageQueryEnum,
  });

  const sources = queryResult?.queryResult.searchResults || [];
  const sourcesRendered = sources.slice(0, 3).map((source) => (
    <div
      key={source.link}
      className="flex flex-col gap-2 px-2 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer col-span-2"
      onClick={() => window.open(source.formattedUrl, "_blank")}
    >
      <span className="flex items-center gap-2">
        <img
          src={getFavicon(source.formattedUrl)}
          alt={source.formattedUrl}
          style={{ width: "20px", height: "20px" }}
          className="rounded-full"
        />
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 truncate">
          {source.title}
        </p>
      </span>
      <p className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed line-clamp-2">
        {source.snippet}
      </p>
    </div>
  ));
  if (page === PageQueryEnum.SOURCES) {
    return;
  }
  return (
    <main className="my-4">
      <div className="grid grid-cols-7 gap-4">
        {sourcesRendered}
        {
          <Button
            variant="outline"
            className="col-span-1"
            onClick={() => setPage(PageQueryEnum.SOURCES)}
          >
            View all {sources.length > 3 ? `+${sources.length - 3}` : ""}
          </Button>
        }
      </div>
    </main>
  );
}
