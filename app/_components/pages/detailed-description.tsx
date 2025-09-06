"use client";
import { Status } from "@/src/types/status";
import { DetailedDescription as DetailedDescriptionType } from "@/src/types/detailed-description";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import { LoadingScreen } from "../loading-screen";
import { ImagesPreview } from "../images-preview";
import { GoogleSearchImage } from "@/src/types/google-search-results";
import Timeline from "../timeline";
interface DetailedDescriptionProps {
  status: Status | undefined;
  detailedDescription: DetailedDescriptionType[] | undefined;
  images: GoogleSearchImage[];
}

export function DetailedDescription({
  status,
  detailedDescription,
  images,
}: DetailedDescriptionProps) {
  switch (status) {
    case Status.PENDING:
      return <Timeline activeStep={Status.PENDING} />;
    case Status.PENDING_WEB_SCRAPING:
      return <Timeline activeStep={Status.PENDING_WEB_SCRAPING} />;
    case Status.WEB_SCRAPING_COMPLETED:
      return <Timeline activeStep={Status.WEB_SCRAPING_COMPLETED} />;
    case Status.GENERATING_RESPONSE:
      return <Timeline activeStep={Status.GENERATING_RESPONSE} />;
    case Status.SUCCESS:
      return (
        <main className="my-2">
          <ImagesPreview images={images || []} />
          <div className="flex flex-col gap-2 pb-4">
            {detailedDescription?.map((item) => (
              <div key={item.heading}>
                <h3 className={cn("text-lg font-medium mb-2")}>
                  {item.heading}
                </h3>
                <p
                  className={cn(" text-zinc-800 dark:text-zinc-200 text-base")}
                >
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
    case Status.ERROR:
      return <div>Error</div>;
  }
}
