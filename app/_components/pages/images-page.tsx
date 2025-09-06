"use client";
import { GoogleSearchImage } from "@/src/types/google-search-results";
import { LoadingScreen } from "../loading-screen";

export function ImagesPage({ images }: { images: GoogleSearchImage[] }) {
  if (!images.length) {
    return (
      <LoadingScreen
        title="Gathering images"
        subtitle="We are gathering images for your query"
      />
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {images.map((image) => (
        <div key={image.link} className="col-span-2 flex flex-col gap-2">
          <img
            src={image.link}
            alt={image.title}
            className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => window.open(image.link, "_blank")}
          />
          <p className="text-xs text-zinc-800 dark:text-zinc-300 truncate">
            {image.title}
          </p>
        </div>
      ))}
    </div>
  );
}
