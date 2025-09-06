"use client";
import { GoogleSearchImage } from "@/src/types/google-search-results";
export function ImagesPreview({ images }: { images: GoogleSearchImage[] }) {
  return (
    <div className="my-3 grid grid-cols-4 gap-2">
      {images.map((image, idx) => (
        <img
          src={image.link}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
          key={image.title + idx}
        />
      ))}
    </div>
  );
}
