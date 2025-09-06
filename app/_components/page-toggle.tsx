"use client";
import { useQueryState } from "nuqs";
import { PageQueryEnum } from "@/src/types/nuqs";
import { ScanIcon, CompassIcon, BookOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const pages = [
  {
    label: "Short Response",
    value: PageQueryEnum.SHORT_RESPONSE,
    icon: <ScanIcon className="w-4 h-4" />,
  },
  {
    label: "Detailed Results",
    value: PageQueryEnum.DETAILED_RESULTS,
    icon: <CompassIcon className="w-4 h-4" />,
  },
  {
    label: "Sources",
    value: PageQueryEnum.SOURCES,
    icon: <BookOpenIcon className="w-4 h-4" />,
  },
  {
    label: "Images",
    value: PageQueryEnum.IMAGES,
    icon: <BookOpenIcon className="w-4 h-4" />,
  },
];
export function PageToggle() {
  const [page, setPage] = useQueryState<PageQueryEnum>("page", {
    parse: (value) => value as PageQueryEnum,
    defaultValue: PageQueryEnum.SHORT_RESPONSE,
  });
  return (
    <main className="relative">
      <div className="flex gap-2 mt-3 ">
        {pages.map((item) => (
          <main key={item.value}>
            <button
              onClick={() => setPage(item.value)}
              className={cn(
                "flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-md px-4 py-2",
                page === item.value && "text-zinc-800 dark:text-zinc-200"
              )}
            >
              {item.icon}
              {item.label}
            </button>
            {page === item.value && (
              <div className="h-[2px] mt-2 bg-zinc-800 dark:bg-zinc-200 rounded-full"></div>
            )}
          </main>
        ))}
      </div>
      <Separator className="mt-2 absolute bottom-0 left-0 right-0" />
    </main>
  );
}
