import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function getFavicon(url: string) {
  // Return a default favicon if URL is empty or invalid
  if (!url || url.trim() === "") {
    return "/favicon.ico";
  }

  try {
    const hostname = new URL(url).hostname;
    return `https://cdn.brandfetch.io/${hostname}/w/400/h/400`;
  } catch (error) {
    // Return a default favicon if URL is invalid
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return "/favicon.ico";
  }
}
