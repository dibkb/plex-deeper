import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function getFavicon(url: string) {
  const hostname = new URL(url).hostname;
  return `https://cdn.brandfetch.io/${hostname}/w/400/h/400`;
}
