"use client";
import { Status } from "@/src/types/status";
import TimelineStep from "./timeline-step";

export default function Timeline({ activeStep }: { activeStep: Status }) {
  const steps: Record<
    Exclude<Status, Status.ERROR>,
    { title: string; description: string }
  > = {
    [Status.PENDING]: {
      title: "Pending",
      description: "We are processing your query",
    },
    [Status.PENDING_WEB_SCRAPING]: {
      title: "Web scraping in progress",
      description: "We are gathering all the information from the web",
    },
    [Status.WEB_SCRAPING_COMPLETED]: {
      title: "Web scraping completed",
      description:
        "We gathered all the information we need to generate a detailed response",
    },
    [Status.GENERATING_RESPONSE]: {
      title: "Generating response",
      description: "We are generating a detailed response to your query",
    },
    [Status.SUCCESS]: {
      title: "Success",
      description: "We generated a detailed response to your query",
    },
  };

  const activeStepIndex = Object.keys(steps).indexOf(activeStep);

  return (
    <div className="p-6 sm:p-10">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20">
        {Object.values(steps).map((step, idx) => {
          return (
            <TimelineStep
              key={step.title}
              title={step.title}
              description={step.description}
              isActive={idx <= activeStepIndex}
              isActiveStep={idx === activeStepIndex}
            />
          );
        })}
      </div>
    </div>
  );
}
