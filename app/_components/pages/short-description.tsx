"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Status } from "@/src/types/status";
import { LoadingScreen } from "../loading-screen";

export function ShortDescription({
  status,
  shortDescription,
}: {
  status: Status | undefined;
  shortDescription: string;
}) {
  switch (status) {
    case Status.PENDING:
      return (
        <LoadingScreen
          title="Pending"
          subtitle="We are processing your query"
        />
      );
    default:
      return (
        <main className="my-2">
          <p
            className={cn(
              manrope.className,
              "text-zinc-800 dark:text-zinc-300 font-medium"
            )}
          >
            {shortDescription}
          </p>
        </main>
      );
  }
}
