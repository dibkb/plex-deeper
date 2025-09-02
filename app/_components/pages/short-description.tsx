"use client";
import { QueryResultResponse } from "@/app/api/query/route";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function ShortDescription({
  shortDescription,
}: {
  shortDescription: string;
}) {
  return (
    <main className="mt-2">
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
