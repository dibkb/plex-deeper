"use client";
import getFavicon from "@/lib/utils";
import { GoogleSearchResults } from "@/src/types/google-search-results";

export function SourcesPage({ sources }: { sources: GoogleSearchResults[] }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {sources.map((source) => (
        <div
          key={source.link}
          className="flex flex-col gap-2 px-4 py-4 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer col-span-2"
          onClick={() => window.open(source.formattedUrl, "_blank")}
        >
          <span className="flex items-center gap-2">
            <img
              src={getFavicon(source.formattedUrl)}
              alt={source.formattedUrl}
              style={{ width: "20px", height: "20px" }}
              className="rounded-full"
            />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
              <p className="">{source.title}</p>
              <p className=""> {source.formattedUrl}</p>
            </span>
          </span>
          <p className="text-xs text-zinc-800 dark:text-zinc-300">
            {source.snippet}
          </p>
        </div>
      ))}
    </div>
  );
}
