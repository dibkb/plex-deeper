"use client";
import { cn } from "@/lib/utils";
import { GoogleSearchImage } from "@/src/types/google-search-results";
import { useState } from "react";
export function ImagesPreview({ images }: { images: GoogleSearchImage[] }) {
  const [isHover, setIsHover] = useState<number | undefined>(undefined);
  return (
    <div className="mt-4 mb-8 grid grid-cols-4 gap-2">
      {images.slice(0, 4).map((image, idx) => (
        <div
          key={image.title + idx}
          className=" hover:scale-105 transition-all duration-300 group cursor-pointer"
          onMouseEnter={() => setIsHover(idx)}
          onMouseLeave={() => setIsHover(undefined)}
          onClick={() => window.open(image.link, "_blank")}
        >
          <img
            src={image.link}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
            key={image.title + idx}
          />
          <p
            className={cn(
              "text-xs invisible group-hover:visible transition-all duration-300 text-zinc-500 dark:text-zinc-400 truncate mt-1",
              isHover === idx && "visible"
            )}
          >
            {image.title}
          </p>
        </div>
      ))}
    </div>
  );
}
