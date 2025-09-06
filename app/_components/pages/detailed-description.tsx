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
      return (
        <LoadingScreen
          title="Pending"
          subtitle="We are processing your query"
        />
      );
    case Status.PENDING_WEB_SCRAPING:
      return (
        <LoadingScreen
          title="Web scraping in progress"
          subtitle="We are gathering all the information from the web"
        />
      );
    case Status.WEB_SCRAPING_COMPLETED:
      return (
        <LoadingScreen
          title="Web scraping completed"
          subtitle="We gathered all the information we need to generate a detailed response"
        />
      );
    case Status.GENERATING_RESPONSE:
      return (
        <LoadingScreen
          title="Generating response"
          subtitle="We are generating a detailed response to your query"
        />
      );
    case Status.SUCCESS:
      return (
        <Timeline activeStep={Status.GENERATING_RESPONSE} />
        // <main className="my-2">
        //   <ImagesPreview images={images || []} />
        //   <div className="flex flex-col gap-2 pb-4">
        //     {detailedDescription?.map((item) => (
        //       <div key={item.heading}>
        //         <h3 className={cn("text-lg font-medium mb-2")}>
        //           {item.heading}
        //         </h3>
        //         <p
        //           className={cn(" text-zinc-800 dark:text-zinc-200 text-base")}
        //         >
        //           {item.paragraphs?.join(" ")}
        //         </p>
        //         <ul className="grid gap-2">
        //           {item.bulletPoints?.map((point) => (
        //             <li
        //               key={point}
        //               className={cn(
        //                 "text-zinc-800 dark:text-zinc-200 text-base grid grid-cols-[auto_1fr] gap-2 items-start"
        //               )}
        //             >
        //               <DotIcon className="w-4 h-4 text-zinc-800 dark:text-zinc-200 mt-1 flex-shrink-0" />
        //               <span>{point}</span>
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //     ))}{" "}
        //   </div>
        // </main>
      );
    case Status.ERROR:
      return <div>Error</div>;
  }
}
