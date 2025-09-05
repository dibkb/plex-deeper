"use client";
export function ImagesPreview({ images }: { images: string[] }) {
  return (
    <div className="my-3 grid grid-cols-4 gap-2">
      {images.map((image, idx) => (
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover rounded-xl"
          key={image + idx}
        />
      ))}
    </div>
  );
}
