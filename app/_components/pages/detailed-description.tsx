"use client";
import { Status } from "@/src/types/status";
import { DetailedDescription as DetailedDescriptionType } from "@/src/types/detailed-description";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
interface DetailedDescriptionProps {
  status: Status | undefined;
  detailedDescription: DetailedDescriptionType[] | undefined;
}

export function DetailedDescription({
  status,
  detailedDescription,
}: DetailedDescriptionProps) {
  return (
    <main className="mt-2">
      <div className="flex flex-col gap-2">
        {detailedDescription?.map((item) => (
          <div key={item.heading}>
            <h3 className={cn("text-lg font-medium mb-2")}>{item.heading}</h3>
            <p className={cn(" text-zinc-800 dark:text-zinc-200 text-base")}>
              {item.paragraphs?.join(" ")}
            </p>
            <ul className="grid gap-2">
              {item.bulletPoints?.map((point) => (
                <li
                  key={point}
                  className={cn(
                    "text-zinc-800 dark:text-zinc-200 text-base grid grid-cols-[auto_1fr] gap-2 items-start"
                  )}
                >
                  <DotIcon className="w-4 h-4 text-zinc-800 dark:text-zinc-200 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}{" "}
      </div>
    </main>
  );
}
